import { VContent, VContentVirtual } from './content';
import { getContextWithVNodeMapping, getElementContextWithNodeMapping, VAstTypeKey, VNodeMapping } from './utils';
import { VText, VTextVirtual } from './text';
import { VOpenTag, VOpenTagVirtual } from './open-tag';
import { VCloseTag, VCloseTagVirtual } from './close-tag';
import { VDocumentVirtual } from './document';
import { JScript, JScriptVirtual } from 'languages/javascript';
import { VStyleText, VStyleTextVirtual } from './style-text';
/** $ _import $ **/

export type VElementNode = VElement
| VContent
| VText

export type VElementNodeVirtual = VElementVirtual
| VContentVirtual
| VTextVirtual

export interface VStyle {
    type: 'Style';
}

export interface VElement {
    type: 'Element';
    value: VElementValue;
    /** $ childType $ **/
}

export interface VScriptElement {
    type: 'ScriptElement';
    value: JScript;
    open: VOpenTag;
    close: VCloseTag;
}

export interface VScriptElementVirtual {
    type: 'ScriptElement';
    value?: JScriptVirtual;
    open?: VOpenTagVirtual;
    close?: VCloseTagVirtual;
}

export interface VStyleElement {
    type: 'StyleElement';
    value: VStyleText;
    open: VOpenTag;
    close: VCloseTag;
}

export interface VStyleElementVirtual {
    type: 'StyleElement';
    value?: VStyleTextVirtual;
    open?: VOpenTagVirtual;
    close?: VCloseTagVirtual;
}

export interface VNodeElement {
    type: 'NodeElement';
    values: VElementNode[];
    open: VOpenTag;
    close: VCloseTag;
}

export interface VNodeElementVirtual {
    type: 'NodeElement';
    values?: VElementNodeVirtual[];
    open?: VOpenTagVirtual;
    close?: VCloseTagVirtual;
}

export type VElementValue = VScriptElement
| VStyleElement
| VNodeElement

export type VElementValueVirtual = VScriptElementVirtual
| VStyleElementVirtual
| VNodeElementVirtual

export interface VElementVirtual {
    type: 'Element';
    nodes?: VElementNodeVirtual[];
    from?: number;
    to?: number;
    openTag?: VOpenTagVirtual;
    closeTag?: VCloseTagVirtual;
    styleText?: VStyleTextVirtual;
    script?: JScriptVirtual;
    value?: VElementValueVirtual;
    /** $ childVirtualType $ **/
}

export function genVElementFromRaw (element: VElementVirtual): VElementVirtual {
    const { nodes } = element;
    if (element.openTag?.tagName?.value === 'script') {
        return {
            type: 'Element',
            value: {
                type: 'ScriptElement',
                value: element.script,
                open: element.openTag,
                close: element.closeTag
            }
        };
    }
    if (element.openTag?.tagName?.value === 'style') {
        return {
            type: 'Element',
            value: {
                type: 'StyleElement',
                value: element.styleText,
                open: element.openTag,
                close: element.closeTag
            }
        };
    }
    const values: VElementNodeVirtual[] = [];
    if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.type === 'Element') {
                values.push(genVElementFromRaw(node));
            } else {
                values.push(node);
            }
        }
    }
    return {
        type: 'Element',
        value: {
            type: 'NodeElement',
            values,
            open: element.openTag,
            close: element.closeTag
        }
    };
}

export function _VElement (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    childFrom: number,
    childTo: number
) {
    const [_child, index, children] = getElementContextWithNodeMapping(mapping, childFrom, childTo);
    const child = genVElementFromRaw(_child);

    if (parentName === 'Content') {
        const [_parent] = getContextWithVNodeMapping<VContentVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }

    if (parentName === 'Element') {
        /**
         * 递归的 element 不用 push, 因为已经在创建的时候生成过了
         * **/
        children.splice(index, 1);
    }

    if (parentName === 'Document') {
        const [_parent] = getContextWithVNodeMapping<VDocumentVirtual>(mapping, parentName);
        _parent.values.push(child);
        children.splice(index, 1);
    }
}

export function genElement (from: number, to: number): VElementVirtual {
    return {
        type: 'Element',
        nodes: [],
        from,
        to
    };
}
