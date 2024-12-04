import { JBinaryExpressionVirtual } from './binary-expression';
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
    children.splice(index, 1);
    callback();
}
