import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JArgList, JArgListVirtual } from './arg-list';
/** $ _import $ **/

export interface JNewExpression {
    type: 'NewExpression';
    value: JSingleExpressionValue;
    argList?: JArgList;
    /** $ childType $ **/
}

export interface JNewExpressionVirtual {
    type: 'NewExpression';
    value?: JSingleExpressionValueVirtual;
    argList?: JArgListVirtual;
    /** $ childVirtualType $ **/
}

export function _JNewExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JNewExpressionVirtual>(mapping, 'NewExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
