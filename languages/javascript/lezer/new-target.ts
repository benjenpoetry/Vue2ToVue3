import { JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JPropertyName, JPropertyNameVirtual } from './property-name';
import { JOperator, JOperatorVirtual } from './operator';
/** $ _import $ **/

export interface JNewTarget {
    type: 'NewTarget';
    _new: JKeyword;
    propertyName: JPropertyName;
    dot?: JOperator;
    /** $ childType $ **/
}

export interface JNewTargetVirtual {
    type: 'NewTarget';
    _new?: JKeywordVirtual;
    propertyName?: JPropertyNameVirtual;
    dot?: JOperatorVirtual;
    /** $ childVirtualType $ **/
}

export function _JNewTarget (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JNewTargetVirtual>(mapping, 'NewTarget');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
