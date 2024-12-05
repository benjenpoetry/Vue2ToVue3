import { JAssignmentExpressionVirtual } from './assignment-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JEquals {
    type: 'Equals';
    value: string
    /** $ childType $ **/
}

export interface JEqualsVirtual {
    type: 'Equals';
    value?: string
    /** $ childVirtualType $ **/
}

export function _JEquals (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JEqualsVirtual>(mapping, 'Equals');
    child.value = value;
    if (parentName === 'AssignmentExpression') {
        const [_parent] = getContextWithJNodeMapping<JAssignmentExpressionVirtual>(mapping, parentName);
        _parent.updateOp = {
            type: 'UpdateOp',
            value
        };
    }
    children.splice(index, 1);
    callback();
}
