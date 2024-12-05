import { JMemberExpression, JMemberExpressionVirtual } from './member-expression';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JVariableName, JVariableNameVirtual } from './variable-name';
import { JUpdateOp, JUpdateOpVirtual } from './update-op';
/** $ _import $ **/

export interface JAssignmentExpression {
    type: 'AssignmentExpression';
    left: JVariableName | JMemberExpression;
    right: JVariableName | JMemberExpression | JSingleExpressionValue;
    updateOp: JUpdateOp;
    /** $ childType $ **/
}

export interface JAssignmentExpressionVirtual {
    type: 'AssignmentExpression';
    left?: JVariableNameVirtual | JMemberExpressionVirtual
    right?: JVariableNameVirtual | JMemberExpressionVirtual | JSingleExpressionValueVirtual
    updateOp?: JUpdateOpVirtual;
    /** $ childVirtualType $ **/
}

export function _JAssignmentExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JAssignmentExpressionVirtual>(mapping, 'AssignmentExpression');
    children.splice(index, 1);

    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'AssignmentExpression') {
        const [_parent] = getContextWithJNodeMapping<JAssignmentExpressionVirtual>(mapping, parentName);
        _parent.right = child;
    }
}
