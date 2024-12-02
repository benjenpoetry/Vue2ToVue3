import { JUnaryExpressionVirtual } from './unary-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JLogicOp {
    type: 'LogicOp';
    value: string;
    /** $ childType $ **/
}

export interface JLogicOpVirtual {
    type: 'LogicOp';
    value?: string;
    /** $ childVirtualType $ **/
}

export function _JLogicOp (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JLogicOpVirtual>(mapping, 'LogicOp');
    child.value = value;

    if (parentName === 'UnaryExpression') {
        const [_parent] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, parentName);
        _parent.prefix = child;
    }

    callback();
    children.splice(index, 1);
}
