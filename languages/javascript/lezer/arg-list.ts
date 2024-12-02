import { JNewExpressionVirtual } from './new-expression';
import { JOperator, JOperatorVirtual } from './operator';
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
    /** $ childType $ **/
}

export interface JArgListVirtual {
    type: 'ArgList';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
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
    children.splice(index, 1);
}
