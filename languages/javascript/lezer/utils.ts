import { javascriptLanguage } from '@codemirror/lang-javascript';
import {
    Position,
    Range,
    Diagnostic,
    DiagnosticSeverity
} from 'vscode-languageserver-protocol';

import { JAstType } from './ast-type';
import { JAstVirtualType } from './ast-virtual-type';
import { JSingleExpression } from './single-expression';

import { _JNumber } from './number';
import { _JString } from './string';
import { _JVariableName } from './variable-name';
import { _JTemplateString } from './template-string';
import { JScript } from './script';
import { _JBooleanLiteral } from './boolean-literal';
import { _JKeyword, isJKeyword } from './keyword';
import { _JRegExp } from './reg-exp';
import { _JArrayExpression } from './array-expression';
import { _JOperator, isJOperator } from './operator';
import { _JSpread } from './spread';
import { _JObjectExpression } from './object-expression';
import { _JProperty } from './property';
import { _JPropertyDefinition } from './property-definition';
import { _JParamList } from './param-list';
import { _JBlock } from './block';
import { _JNewTarget } from './new-target';
import { _JPropertyName } from './property-name';
import { _JNewExpression } from './new-expression';
import { _JArgList } from './arg-list';
import { _JUnaryExpression } from './unary-expression';
import { _JLogicOp } from './logic-op';
import { _JYieldExpression } from './yield-expression';
import { _JStar } from './star';
import { _JAwaitExpression } from './await-expression';
import { _JParenthesizedExpression } from './parenthesized-expression';
import { _JClassExpression } from './class-expression';
import { _JVariableDefinition } from './variable-definition';
import { _JClassBody } from './class-body';
import { _JFunctionExpression } from './function-expression';
import { _JArrowFunction } from './arrow-function';
import { _JArrow } from './arrow';
import { _JExportDeclaration } from './export-declaration';
import { _JReturnStatement } from './return-statement';
import { _JMemberExpression } from './member-expression';
import { _JBinaryExpression } from './binary-expression';
import { _JArithOp } from './arith-op';
import { _JConditionalExpression } from './conditional-expression';
import { _JAssignmentExpression } from './assignment-expression';
import { _JUpdateOp } from './update-op';
import { _JEquals } from './equals';
import { _JPostfixExpression } from './postfix-expression';
import { _JCallExpression } from './call-expression';
import { _JDynamicImport } from './dynamic-import';
import { _JImportMeta } from './import-meta';
import { _JImportDeclaration } from './import-declaration';
import { _JImportGroup } from './import-group';
/** $ _import $ **/

export type JNodeMapping = Map<JAstTypeKey, JAstVirtualType[]>;

export type JAstTypeKey = Pick<JAstType, 'type'>['type'];

export type JCallback = (eat: boolean) => boolean;

/**
 * 根据上下文获取虚拟树集合
 * **/
export function getContextWithJNodeMapping<V> (
    mapping: JNodeMapping,
    key: JAstTypeKey
): [V, number, V[]] {
    const values = mapping.get(key)!;
    const index = values.length - 1;
    const value = values[index];
    if (value === undefined) {
        throw new Error(`Can not get values from ${key}`);
    }
    return [value as V, index, values as V[]];
}

export function genJsVirtualNode (type: JAstTypeKey): JAstVirtualType {
    switch (type) {
    case 'SingleExpression':
        return { type };
    case 'Number':
        return { type: 'Number' };
    case 'String':
        return { type: 'String' };
    case 'VariableName':
        return { type: 'VariableName' };
    case 'TemplateString':
        return { type: 'TemplateString' };
    case 'Script':
        return { type: 'Script', values: [] };
    case 'BooleanLiteral':
        return { type: 'BooleanLiteral' };
    case 'Keyword':
        return { type: 'Keyword' };
    case 'Operator':
        return { type: 'Operator' };
    case 'RegExp':
        return { type: 'RegExp' };
    case 'ArrayExpression':
        return { type: 'ArrayExpression', commas: [], values: [], spreads: [] };
    case 'Spread':
        return { type: 'Spread' };
    case 'ObjectExpression':
        return { type: 'ObjectExpression', values: [], index: 0, commas: [] };
    case 'Property':
        return { type: 'Property', value: {} };
    case 'PropertyDefinition':
        return { type: 'PropertyDefinition' };
    case 'ParamList':
        return { type: 'ParamList' };
    case 'Block':
        return { type: 'Block', values: [] };
    case 'NewTarget':
        return { type: 'NewTarget' };
    case 'PropertyName':
        return { type: 'PropertyName' };
    case 'NewExpression':
        return { type: 'NewExpression' };
    case 'ArgList':
        return { type: 'ArgList', values: [] };
    case 'UnaryExpression':
        return { type: 'UnaryExpression' };
    case 'LogicOp':
        return { type: 'LogicOp' };
    case 'YieldExpression':
        return { type: 'YieldExpression' };
    case 'Star':
        return { type: 'Star' };
    case 'AwaitExpression':
        return { type: 'AwaitExpression' };
    case 'ParenthesizedExpression':
        return { type: 'ParenthesizedExpression' };
    case 'ClassExpression':
        return { type: 'ClassExpression' };
    case 'VariableDefinition':
        return { type: 'VariableDefinition' };
    case 'ClassBody':
        return { type: 'ClassBody' };
    case 'FunctionExpression':
        return { type: 'FunctionExpression' };
    case 'ArrowFunction':
        return { type: 'ArrowFunction' };
    case 'Arrow':
        return { type: 'Arrow' };
    case 'ExportDeclaration':
        return { type: 'ExportDeclaration' };
    case 'ReturnStatement':
        return { type: 'ReturnStatement' };
    case 'MemberExpression':
        return { type: 'MemberExpression' };
    case 'BinaryExpression':
        return { type: 'BinaryExpression' };
    case 'ArithOp':
        return { type: 'ArithOp' };
    case 'ConditionalExpression':
        return { type: 'ConditionalExpression' };
    case 'AssignmentExpression':
        return { type: 'AssignmentExpression' };
    case 'UpdateOp':
        return { type: 'UpdateOp' };
    case 'Equals':
        return { type: 'Equals' };
    case 'PostfixExpression':
        return { type: 'PostfixExpression' };
    case 'CallExpression':
        return { type: 'CallExpression' };
    case 'DynamicImport':
        return { type: 'DynamicImport' };
    case 'ImportMeta':
        return { type: 'ImportMeta' };
    case 'ImportDeclaration':
        return { type: 'ImportDeclaration' };
    case 'ImportGroup':
        return { type: 'ImportGroup', values: [] };
    /** $ genVirtualNode $ **/
    }
}

/**
 * 根据语法树的 node 生成虚拟树节点
 * **/
export function genJNodeMappingNode (
    mapping: JNodeMapping,
    key: JAstTypeKey
) {
    const values = mapping.get(key);
    const node = genJsVirtualNode(key);

    if (node === undefined) {
        throw new Error('Node not exist, please generate first');
    }

    if (values === undefined) {
        mapping.set(key, [node]);
    } else {
        values.push(node);
    }
}

/**
 * 吃入字符的回调函数
 * 用于确定字符行数 标记字符位置
 * **/
export interface JSEatingCallback {
    (value: string, to: number): void;
}

export function genJsAst (
    source: string,
    top: 'SingleExpression' | 'Script' = 'SingleExpression'
) {
    const parser = javascriptLanguage.parser.configure({
        top
    });
    const tree = parser.parse(source);
    const mapping: JNodeMapping = new Map();

    const startsMapping: Map<number, Position> = new Map();
    const endsMapping: Map<number, Position> = new Map();

    // 指针
    let cursor = 0;
    let line = 0;
    let character = 0;

    tree.iterate({
        enter (n) {
            const value = source.slice(n.from, n.to);
            const name = n.name as JAstTypeKey;

            if (isJKeyword(value) && isJKeyword(name)) {
                genJNodeMappingNode(mapping, 'Keyword');
                return;
            }

            if (isJOperator(name) && isJOperator(value)) {
                genJNodeMappingNode(mapping, 'Operator');
                return;
            }

            genJNodeMappingNode(mapping, name);
        },
        leave (n) {
            const { from, to } = n;

            const _child = n.node;
            const _parent = n.node.parent;

            // Parent 为 null 的情况仅存在于 prog
            if (_parent === null) {
                return true;
            }

            const childName = _child.name as JAstTypeKey;
            const parentName = _parent.name as JAstTypeKey;

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

            return genJsNode(
                mapping,
                childName,
                parentName,
                value,
                range,
                to,
                callback
            );
        }
    });

    const value = mapping.get(top)![0];
    mapping.clear();

    if (top === 'SingleExpression') {
        return value as JSingleExpression;
    }

    return value as JScript;

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

/**
 * @param to The end of node cursor
 * **/
export function genJsNode (
    mapping: JNodeMapping,
    childName: JAstTypeKey,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    to: number,
    _callback: JSEatingCallback
) {
    if (isJKeyword(value) && isJKeyword(childName)) {
        return _JKeyword(mapping, parentName, value, range, callback);
    }

    if (isJOperator(value) && isJOperator(childName)) {
        return _JOperator(mapping, parentName, value, range, callback);
    }

    switch (childName) {
    case 'Number':
        return _JNumber(mapping, parentName, value, range, callback);
    case 'String':
        return _JString(mapping, parentName, value, callback);
    case 'VariableName':
        return _JVariableName(mapping, parentName, value, range, callback);
    case 'TemplateString':
        return _JTemplateString(mapping, parentName);
    case 'Script':
        return true;
    case 'SingleExpression':
        return true;
    case 'BooleanLiteral':
        return _JBooleanLiteral(mapping, parentName, value, callback);
    case 'RegExp':
        return _JRegExp(mapping, parentName, value, callback);
    case 'ArrayExpression':
        return _JArrayExpression(mapping, parentName);
    case 'Spread':
        return _JSpread(mapping, parentName, value, range, callback);
    case 'ObjectExpression':
        return _JObjectExpression(mapping, parentName);
    case 'Property':
        return _JProperty(mapping, parentName);
    case 'PropertyDefinition':
        return _JPropertyDefinition(mapping, parentName, value, callback);
    case 'ParamList':
        return _JParamList(mapping, parentName);
    case 'Block':
        return _JBlock(mapping, parentName);
    case 'NewTarget':
        return _JNewTarget(mapping, parentName);
    case 'PropertyName':
        return _JPropertyName(mapping, parentName, value, callback);
    case 'NewExpression':
        return _JNewExpression(mapping, parentName);
    case 'ArgList':
        return _JArgList(mapping, parentName);
    case 'UnaryExpression':
        return _JUnaryExpression(mapping, parentName);
    case 'LogicOp':
        return _JLogicOp(mapping, parentName, value, range, callback);
    case 'YieldExpression':
        return _JYieldExpression(mapping, parentName);
    case 'Star':
        return _JStar(mapping, parentName, value, range, callback);
    case 'AwaitExpression':
        return _JAwaitExpression(mapping, parentName);
    case 'ParenthesizedExpression':
        return _JParenthesizedExpression(mapping, parentName);
    case 'ClassExpression':
        return _JClassExpression(mapping, parentName);
    case 'VariableDefinition':
        return _JVariableDefinition(mapping, parentName, value, callback);
    case 'ClassBody':
        return _JClassBody(mapping, parentName);
    case 'FunctionExpression':
        return _JFunctionExpression(mapping, parentName);
    case 'ArrowFunction':
        return _JArrowFunction(mapping, parentName);
    case 'Arrow':
        return _JArrow(mapping, parentName, value, range, callback);
    case 'ExportDeclaration':
        return _JExportDeclaration(mapping, parentName);
    case 'ReturnStatement':
        return _JReturnStatement(mapping, parentName);
    case 'MemberExpression':
        return _JMemberExpression(mapping, parentName);
    case 'BinaryExpression':
        return _JBinaryExpression(mapping, parentName);
    case 'ArithOp':
        return _JArithOp(mapping, parentName, value, callback);
    case 'ConditionalExpression':
        return _JConditionalExpression(mapping, parentName);
    case 'AssignmentExpression':
        return _JAssignmentExpression(mapping, parentName);
    case 'UpdateOp':
        return _JUpdateOp(mapping, parentName, value, callback);
    case 'Equals':
        return _JEquals(mapping, parentName, value, callback);
    case 'PostfixExpression':
        return _JPostfixExpression(mapping, parentName);
    case 'CallExpression':
        return _JCallExpression(mapping, parentName);
    case 'DynamicImport':
        return _JDynamicImport(mapping, parentName);
    case 'ImportMeta':
        return _JImportMeta(mapping, parentName);
    case 'ImportDeclaration':
        return _JImportDeclaration(mapping, parentName);
    case 'ImportGroup':
        return _JImportGroup(mapping, parentName);
    /** $ genAst $ **/
    }
    function callback () {
        _callback(value, to);
    }
}
