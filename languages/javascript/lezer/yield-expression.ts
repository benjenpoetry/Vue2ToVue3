import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JStar, JStarVirtual } from './star';
/** $ _import $ **/

export interface JYieldExpression {
    type: 'YieldExpression';
    _yield: JKeyword;
    star?: JStar;
    value: JSingleExpressionValue
    /** $ childType $ **/
}

export interface JYieldExpressionVirtual {
    type: 'YieldExpression';
    _yield?: JKeywordVirtual;
    star?: JStarVirtual;
    value?: JSingleExpressionValueVirtual
    /** $ childVirtualType $ **/
}

export function _JYieldExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JYieldExpressionVirtual>(mapping, 'YieldExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
