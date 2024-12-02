import { Range } from 'vscode-languageserver-protocol';
import { JArrowFunctionVirtual } from './arrow-function';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JArrow {
    type: 'Arrow';
    value: string;
    range: Range;
    /** $ childType $ **/
}

export interface JArrowVirtual {
    type: 'Arrow';
    value?: string;
    range?: Range;
    /** $ childVirtualType $ **/
}

export function _JArrow (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JArrowVirtual>(mapping, 'Arrow');
    child.value = value;
    child.range = range;
    if (parentName === 'ArrowFunction') {
        const [_parent] = getContextWithJNodeMapping<JArrowFunctionVirtual>(mapping, parentName);
        _parent.arrow = child;
    }
    children.splice(index, 1);
    callback();
}
