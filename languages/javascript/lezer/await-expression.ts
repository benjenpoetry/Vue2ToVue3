import { JKeyword, JKeywordVirtual } from './keyword';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JAwaitExpression {
    type: 'AwaitExpression';
    _await: JKeyword;
    value: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JAwaitExpressionVirtual {
    type: 'AwaitExpression';
    _await?: JKeywordVirtual;
    value?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JAwaitExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JAwaitExpressionVirtual>(mapping, 'AwaitExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
