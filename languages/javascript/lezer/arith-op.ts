import { JBinaryExpressionVirtual } from './binary-expression';
import { JPostfixExpressionVirtual } from './postfix-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JArithOp {
    type: 'ArithOp';
    value: string
    /** $ childType $ **/
}

export interface JArithOpVirtual {
    type: 'ArithOp';
    value?: string
    /** $ childVirtualType $ **/
}

export function _JArithOp (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JArithOpVirtual>(mapping, 'ArithOp');
    child.value = value;
    if (parentName === 'BinaryExpression') {
        const [_parent] = getContextWithJNodeMapping<JBinaryExpressionVirtual>(mapping, parentName);
        _parent.arithOp = child;
    }
    if (parentName === 'PostfixExpression') {
        const [_parent] = getContextWithJNodeMapping<JPostfixExpressionVirtual>(mapping, parentName);
        _parent.op = child;
    }
    children.splice(index, 1);
    callback();
}
