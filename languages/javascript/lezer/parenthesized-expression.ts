import { JOperator, JOperatorVirtual } from './operator';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JParenthesizedExpression {
    type: 'ParenthesizedExpression';
    start: JOperator;
    end: JOperator;
    value: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JParenthesizedExpressionVirtual {
    type: 'ParenthesizedExpression';
    start?: JOperatorVirtual;
    end?: JOperator;
    value?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JParenthesizedExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JParenthesizedExpressionVirtual>(mapping, 'ParenthesizedExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
