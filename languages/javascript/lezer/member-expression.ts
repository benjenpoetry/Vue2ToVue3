import { JAssignmentExpressionVirtual } from './assignment-expression';
import { JOperator, JOperatorVirtual } from './operator';
import { JPropertyName, JPropertyNameVirtual } from './property-name';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JMemberExpression {
    type: 'MemberExpression';
    value: JSingleExpressionValue;
    chain: JOperator;
    propertyName: JPropertyName;
    /** $ childType $ **/
}

export interface JMemberExpressionVirtual {
    type: 'MemberExpression';
    value?: JSingleExpressionValueVirtual;
    chain?: JOperatorVirtual;
    propertyName?: JPropertyNameVirtual;
    /** $ childVirtualType $ **/
}

export function _JMemberExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JMemberExpressionVirtual>(mapping, 'MemberExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'AssignmentExpression') {
        const [_parent] = getContextWithJNodeMapping<JAssignmentExpressionVirtual>(mapping, parentName);
        _parent.left = child;
    }
    children.splice(index, 1);
}
