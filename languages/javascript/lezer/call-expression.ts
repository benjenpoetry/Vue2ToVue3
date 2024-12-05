import { JArgList, JArgListVirtual } from './arg-list';
import { JOperator, JOperatorVirtual } from './operator';
import { JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JCallExpression {
    type: 'CallExpression';
    questionDot: JOperator;
    argList: JArgList;
    /** $ childType $ **/
}

export interface JCallExpressionVirtual {
    type: 'CallExpression';
    questionDot?: JOperatorVirtual;
    argList?: JArgListVirtual;
    /** $ childVirtualType $ **/
}

export function _JCallExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JCallExpressionVirtual>(mapping, 'CallExpression');
    children.splice(index, 1);

    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
}
