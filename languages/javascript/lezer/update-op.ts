import { JAssignmentExpressionVirtual } from './assignment-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JUpdateOp {
    type: 'UpdateOp';
    value: string
    /** $ childType $ **/
}

export interface JUpdateOpVirtual {
    type: 'UpdateOp';
    value?: string
    /** $ childVirtualType $ **/
}

export function _JUpdateOp (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JUpdateOpVirtual>(mapping, 'UpdateOp');
    child.value = value;
    if (parentName === 'AssignmentExpression') {
        const [_parent] = getContextWithJNodeMapping<JAssignmentExpressionVirtual>(mapping, parentName);
        _parent.updateOp = child;
    }
    children.splice(index, 1);
    callback();
}
