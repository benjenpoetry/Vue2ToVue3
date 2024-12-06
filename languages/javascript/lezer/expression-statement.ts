import { JScriptVirtual } from './script';
import { JSingleExpressionValue, JSingleExpressionValueVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JExpressionStatement {
    type: 'ExpressionStatement';
    value: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JExpressionStatementVirtual {
    type: 'ExpressionStatement';
    value?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JExpressionStatement (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JExpressionStatementVirtual>(mapping, 'ExpressionStatement');
    children.splice(index, 1);

    if (parentName === 'Script') {
        const [_parent] = getContextWithJNodeMapping<JScriptVirtual>(mapping, parentName);
        _parent.values.push(child);
    }
}
