import { JClassExpressionVirtual } from './class-expression';
import { JOperator, JOperatorVirtual } from './operator';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JClassBody {
    type: 'ClassBody';
    start: JOperator;
    end: JOperator;
    /** $ childType $ **/
}

export interface JClassBodyVirtual {
    type: 'ClassBody';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    /** $ childVirtualType $ **/
}

export function _JClassBody (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JClassBodyVirtual>(mapping, 'ClassBody');
    if (parentName === 'ClassExpression') {
        const [_parent] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, parentName);
        _parent.classBody = child;
    }
    children.splice(index, 1);
}
