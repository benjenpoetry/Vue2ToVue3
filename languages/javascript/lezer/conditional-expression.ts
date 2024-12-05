import { JLogicOp, JLogicOpVirtual } from './logic-op';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JConditionalExpression {
    type: 'ConditionalExpression';
    question: JLogicOp;
    colon: JLogicOp;
    left: JSingleExpressionValue;
    right: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JConditionalExpressionVirtual {
    type: 'ConditionalExpression';
    question?: JLogicOpVirtual;
    colon?: JLogicOpVirtual;
    left?: JSingleExpressionValueVirtual;
    right?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JConditionalExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JConditionalExpressionVirtual>(mapping, 'ConditionalExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
