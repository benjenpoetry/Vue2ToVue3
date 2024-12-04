import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JArithOp, JArithOpVirtual } from './arith-op';
/** $ _import $ **/

export interface JBinaryExpression {
    type: 'BinaryExpression';
    arithOp: JArithOp;
    left: JSingleExpressionValue;
    right: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JBinaryExpressionVirtual {
    type: 'BinaryExpression';
    arithOp?: JArithOpVirtual;
    left?: JSingleExpressionValueVirtual;
    right?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JBinaryExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JBinaryExpressionVirtual>(mapping, 'BinaryExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
