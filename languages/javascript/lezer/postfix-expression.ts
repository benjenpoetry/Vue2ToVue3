import { JLogicOp, JLogicOpVirtual } from './logic-op';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JPostfixExpression {
    type: 'PostfixExpression';
    value: JSingleExpressionValue;
    logicOp: JLogicOp
    /** $ childType $ **/
}

export interface JPostfixExpressionVirtual {
    type: 'PostfixExpression';
    value?: JSingleExpressionValueVirtual;
    logicOp?: JLogicOpVirtual;
    /** $ childVirtualType $ **/
}

export function _JPostfixExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JPostfixExpressionVirtual>(mapping, 'PostfixExpression');
    children.splice(index, 1);

    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
}
