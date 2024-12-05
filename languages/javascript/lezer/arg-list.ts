import { JCallExpressionVirtual } from './call-expression';
import { JNewExpressionVirtual } from './new-expression';
import { JOperator, JOperatorVirtual } from './operator';
import { JSingleExpressionValue, JSingleExpressionValueVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JArgList {
    type: 'ArgList';
    start: JOperator;
    end: JOperator;
    values: JSingleExpressionValue[]
    /** $ childType $ **/
}

export interface JArgListVirtual {
    type: 'ArgList';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    values: JSingleExpressionValueVirtual[]
    /** $ childVirtualType $ **/
}

export function _JArgList (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JArgListVirtual>(mapping, 'ArgList');
    if (parentName === 'NewExpression') {
        const [_parent] = getContextWithJNodeMapping<JNewExpressionVirtual>(mapping, parentName);
        _parent.argList = child;
    }
    if (parentName === 'CallExpression') {
        const [_parent] = getContextWithJNodeMapping<JCallExpressionVirtual>(mapping, parentName);
        _parent.argList = child;
    }
    children.splice(index, 1);
}
