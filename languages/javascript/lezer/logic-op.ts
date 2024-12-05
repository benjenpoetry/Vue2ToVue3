import { Range } from 'vscode-languageserver-protocol';
import { JConditionalExpressionVirtual } from './conditional-expression';
import { JUnaryExpressionVirtual } from './unary-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JPostfixExpressionVirtual } from './postfix-expression';
/** $ _import $ **/

export interface JLogicOp {
    type: 'LogicOp';
    value: string;
    range: Range;
    /** $ childType $ **/
}

export interface JLogicOpVirtual {
    type: 'LogicOp';
    value?: string;
    range?: Range;
    /** $ childVirtualType $ **/
}

export function _JLogicOp (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JLogicOpVirtual>(mapping, 'LogicOp');
    child.value = value;
    child.range = range;
    children.splice(index, 1);

    if (parentName === 'UnaryExpression') {
        const [_parent] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, parentName);
        _parent.prefix = child;
    }

    if (parentName === 'ConditionalExpression' && value === '?') {
        const [_parent] = getContextWithJNodeMapping<JConditionalExpressionVirtual>(mapping, parentName);
        _parent.question = child;
    }

    if (parentName === 'ConditionalExpression' && value === ':') {
        const [_parent] = getContextWithJNodeMapping<JConditionalExpressionVirtual>(mapping, parentName);
        _parent.colon = child;
    }

    if (parentName === 'PostfixExpression') {
        const [_parent] = getContextWithJNodeMapping<JPostfixExpressionVirtual>(mapping, parentName);
        _parent.logicOp = child;
    }

    callback();
}
