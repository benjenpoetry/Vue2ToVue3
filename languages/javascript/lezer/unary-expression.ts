import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JLogicOp, JLogicOpVirtual } from './logic-op';
/** $ _import $ **/

export interface JUnaryExpression {
    type: 'UnaryExpression';
    prefix: JKeyword | JLogicOp;
    value: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JUnaryExpressionVirtual {
    type: 'UnaryExpression';
    prefix?: JKeywordVirtual | JLogicOpVirtual;
    value?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JUnaryExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, 'UnaryExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
