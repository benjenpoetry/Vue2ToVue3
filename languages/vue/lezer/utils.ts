import {
    Position,
    Range,
    Diagnostic,
    DiagnosticSeverity
} from 'vscode-languageserver-protocol';

import { VAstType } from './ast-type';
import { VAstVirtualType } from './ast-virtual-type';

import { _VContent } from './content';
import { _VText } from './text';
import { _VOpenTag } from './open-tag';
import { _VStartTag } from './start-tag';
import { _VTagName } from './tag-name';
import { _VEndTag } from './end-tag';
import { _VAttribute } from './attribute';
import { _VAttributeName } from './attribute-name';
import { _VIs } from './is';
import { _VAttributeValue } from './attribute-value';
import { _VInterpolation } from './interpolation';
import { genJsNode, genJsVirtualNode, JAstTypeKey, JNodeMapping, isJKeyword, isJOperator } from '@vv/javascript';
import { _VScript, _VSingleExpression } from './javascript';
import { _VOperator, isVueOperator } from './operator';
import { vue } from '../parser';
import { _VCloseTag } from './close-tag';
import { _VStartCloseTag } from './start-close-tag';
import { _VElement, genElement, VElementVirtual } from './element';
import { _VStyleText } from './style-text';
import { VDocument } from './document';
/** $ _import $ **/

export type VNodeMapping = Map<VAstTypeKey, VAstVirtualType[]>;

export type VAstTypeKey = Pick<VAstType, 'type'>['type'];

export type VCallback = (eat: boolean) => boolean;

/**
 * 根据上下文获取虚拟树集合
 * **/
export function getContextWithVNodeMapping<V> (
    mapping: VNodeMapping,
    key: VAstTypeKey
): [V, number, V[]] {
    const values = mapping.get(key)!;
    const index = values.length - 1;
    const value = values[index];
    if (value === undefined) {
        throw new Error(`Can not get values from ${key}`);
    }
    return [value as V, index, values as V[]];
}

export function getElementContextWithNodeMapping (
    mapping: VNodeMapping,
    from: number,
    to: number
) {
    const elements = mapping.get('Element');
    if (elements === undefined) {
        throw new Error('Cant get Element node');
    }
    const result = getElementFromRange(elements as VElementVirtual[], from, to);
    if (result === null) {
        throw new Error('Cant get Element node');
    }
    return result;
}

export function genVueVirtualNode (type: VAstTypeKey): VAstVirtualType {
    switch (type) {
    case 'Text':
        return { type: 'Text' };
    case 'Content':
        return { type: 'Content', values: [] };
    case 'Element':
        return { type: 'Element', nodes: [], from: 0, to: 0 };
    case 'NodeReference':
        return { type: 'NodeReference' };
    case 'OpenTag':
        return { type: 'OpenTag', attributes: [] };
    case 'StartTag':
        return { type: 'StartTag' };
    case 'TagName':
        return { type: 'TagName' };
    case 'EndTag':
        return { type: 'EndTag' };
    case 'Attribute':
        return { type: 'Attribute' };
    case 'AttributeName':
        return { type: 'AttributeName' };
    case 'Is':
        return { type: 'Is' };
    case 'AttributeValue':
        return { type: 'AttributeValue' };
    case 'Interpolation':
        return { type: 'Interpolation' };
    case 'Document':
        return { type: 'Document', values: [] };
    case 'VueOperator':
        return { type: 'VueOperator' };
    case 'CloseTag':
        return { type: 'CloseTag' };
    case 'StartCloseTag':
        return { type: 'StartCloseTag' };
    case 'StyleText':
        return { type: 'StyleText' };
    /** $ genVirtualNode $ **/
    }
    return genJsVirtualNode(type);
}

/**
 * 根据语法树的 node 生成虚拟树节点
 * **/
export function genVNodeMappingNode (
    mapping: VNodeMapping,
    key: VAstTypeKey
) {
    const values = mapping.get(key);
    const node = genVueVirtualNode(key);

    if (node === undefined) {
        throw new Error('Vue node not exist');
    }

    if (values === undefined) {
        mapping.set(key, [node]);
    } else {
        values.push(node);
    }
}

export interface VueEatCallback {
    (value: string, to: number): void;
}

/**
 * @param elements 根据光标区域获取 Element 节点
 * @param elements 父级 elements 他在顶级的展示是 mapping['Element']
 * @param from 光标开始
 * @param to 光标结束
 * @return { VElementVirtual, number, VElementVirtual[] }
 * - 目标节点
 * - 目标节点在 entity 中的索引
 * - entity 集合
 * **/
export function getElementFromRange (
    elements: VElementVirtual[],
    from: number,
    to: number
): [VElementVirtual, number, VElementVirtual[]] | null {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.from === from && element.to === to) {
            return [element, i, elements];
        }
        const nodes = element.nodes?.filter(it => it.type === 'Element');
        const results = getElementFromRange(nodes!, from, to);
        if (results) {
            return results;
        }
    }
    return null;
}

export function genVueAst (
    source: string
) {
    const parser = vue().language.parser;
    const tree = parser.parse(source);
    const mapping: VNodeMapping = new Map();

    const startsMapping: Map<number, Position> = new Map();
    const endsMapping: Map<number, Position> = new Map();

    // 指针
    let cursor = 0;
    let line = 0;
    let character = 0;

    tree.iterate({
        enter (n) {
            const value = source.slice(n.from, n.to);
            const name = n.name as VAstTypeKey;
            const parent = n.node.parent;

            if (isJKeyword(value) && isJKeyword(name)) {
                genVNodeMappingNode(mapping, 'Keyword');
                return;
            }

            if (isJOperator(name) && isJOperator(value)) {
                genVNodeMappingNode(mapping, 'Operator');
                return;
            }

            if (isVueOperator(value)) {
                genVNodeMappingNode(mapping, 'VueOperator');
                return;
            }

            if (parent === null) {
                genVNodeMappingNode(mapping, name);
                return;
            }

            const parentName = parent.name as VAstTypeKey;

            /**
             * Element 属于递归节点，考虑到他的上下级关系比较复杂，所以拿出来单独处理
             * **/
            if (name === 'Element') {
                const elements = mapping.get('Element') as VElementVirtual[];

                if (elements) {
                    if (parentName === 'Element') {
                        const result = getElementFromRange(elements, parent.from, parent.to);
                        if (result) {
                            result[0].nodes?.push(genElement(n.from, n.to));
                        }
                    } else {
                        elements.push(genElement(n.from, n.to));
                    }
                } else {
                    mapping.set('Element', [genElement(n.from, n.to)]);
                }

                return;
            }

            genVNodeMappingNode(mapping, name);
        },
        leave (n) {
            const { from, to } = n;

            const _child = n.node;
            const _parent = n.node.parent;

            /**
             * Parent 为 null 说明已经到达顶层
             * **/
            if (_parent === null) {
                return;
            }

            const childName = _child.name as VAstTypeKey;
            const parentName = _parent.name as VAstTypeKey;

            /**
             * 如果当前开始索引和指针索引位置不同，说明有跳过的内容未检查
             * 通过空格和换行确定代码位置
             * **/
            if (from > cursor) {
                skipping(cursor, from);
            }

            const value = source.slice(from, to);

            // 记录当前内容
            if (!startsMapping.has(from)) {
                startsMapping.set(from, { line, character });
            }

            if (!endsMapping.has(to)) {
                endsMapping.set(to, { line, character: character + value.length });
            }

            // 根据 指针 获取 当前 token 的位置信息
            const range = getTokenRange(from, to);

            // 错误检测
            if (n.type.isError) {
                // Unexpected end of input
                if (from === to) {
                    const prev = n.node.prevSibling;
                    if (prev) {
                        const start = prev.from;
                        const end = prev.to;
                        const range = getTokenRange(start, end);

                        const cause: Diagnostic = {
                            range,
                            message: 'Syntax error',
                            severity: DiagnosticSeverity.Error
                        };

                        throw new SyntaxError('Syntax Error', { cause });
                    }
                }
                const cause: Diagnostic = {
                    range,
                    message: 'Syntax error',
                    severity: DiagnosticSeverity.Error
                };
                // Unexpected input.
                throw new SyntaxError('Syntax Error', { cause });
            }

            return genVueNode(
                mapping,
                childName,
                parentName,
                value,
                range,
                from,
                to,
                callback,
                _parent.from,
                _parent.to
            );
        }
    });

    const value = mapping.get('Document')![0];

    mapping.clear();

    return value as VDocument;

    /**
     * 指针移动回调
     * 当只有需要吃入字符时才调用该函数
     * **/
    function callback (value: string, to: number) {
        cursor = to;
        const length = value.length;
        for (let i = 0; i < length; i++) {
            const v = value[i];
            if (v === '\n') {
                line += 1;
                character = 0;
                continue;
            }
            character++;
        }
    }

    function getTokenRange (from: number, to: number): Range {
        const start = startsMapping.get(from);
        const end = endsMapping.get(to);
        if (
            start === undefined ||
            end === undefined
        ) throw new Error('get token range failed');

        return { start, end };
    }

    function skipping (
        s: number,
        e: number
    ) {
        const skips = source.slice(s, e).split('');
        for (let i = 0; i < skips.length; i++) {
            const skip = skips[i];

            // 换行
            if (skip === '\n') {
                line += 1;
                character = 0;
                continue;
            }

            if (skip === ' ') {
                character++;
            }
        }
    }
}

export function genVueNode (
    mapping: VNodeMapping,
    childName: VAstTypeKey,
    parentName: VAstTypeKey,
    value: string,
    range: Range,
    from: number,
    to: number,
    _callback: VueEatCallback,
    parentFrom: number,
    parentTo: number
) {
    if (isVueOperator(value)) {
        return _VOperator(mapping, parentName, value, range, callback);
    }
    switch (childName) {
    case 'Text':
        return _VText(mapping, parentName, value, callback, parentFrom, parentTo);
    case 'Content':
        return _VContent(mapping, parentName, parentFrom, parentTo);
    case 'OpenTag':
        return _VOpenTag(mapping, parentName, parentFrom, parentTo);
    case 'StartTag':
        return _VStartTag(mapping, parentName, value, callback);
    case 'TagName':
        return _VTagName(mapping, parentName, value, callback);
    case 'EndTag':
        return _VEndTag(mapping, parentName, value, callback);
    case 'Attribute':
        return _VAttribute(mapping, parentName);
    case 'AttributeName':
        return _VAttributeName(mapping, parentName, value, callback);
    case 'Is':
        return _VIs(mapping, parentName, value, callback);
    case 'AttributeValue':
        return _VAttributeValue(mapping, parentName, value, callback);
    case 'Interpolation':
        return _VInterpolation(mapping, parentName);
    case 'SingleExpression':
        return _VSingleExpression(mapping, parentName);
    case 'Script':
        return _VScript(mapping, parentName, parentFrom, parentTo);
    case 'CloseTag':
        return _VCloseTag(mapping, parentName, parentFrom, parentTo);
    case 'StartCloseTag':
        return _VStartCloseTag(mapping, parentName, value, callback);
    case 'Element':
        return _VElement(mapping, parentName, from, to);
    case 'StyleText':
        return _VStyleText(mapping, parentName, value, callback, parentFrom, parentTo);
    /** $ genAst $ **/
    }
    return genJsNode(
        mapping as JNodeMapping,
        childName as JAstTypeKey,
        parentName as JAstTypeKey,
        value,
        range,
        to,
        _callback
    );
    function callback () {
        _callback(value, to);
    }
}
