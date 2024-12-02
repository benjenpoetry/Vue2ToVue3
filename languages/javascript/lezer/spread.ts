import { Range } from 'vscode-languageserver-protocol';
import { JArrayExpressionVirtual } from './array-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JSpread {
    type: 'Spread';
    value: string;
    range: Range;
    /** $ childType $ **/
}

export interface JSpreadVirtual {
    type: 'Spread';
    value?: string;
    range?: Range;
    /** $ childVirtualType $ **/
}

export function _JSpread (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JSpreadVirtual>(mapping, 'Spread');
    child.value = value;
    child.range = range;

    if (parentName === 'ArrayExpression') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.spreads?.push(child);
    }

    children.splice(index, 1);
    callback();
}
