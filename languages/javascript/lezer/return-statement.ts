import { JBlockVirtual } from './block';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JSingleExpressionValue, JSingleExpressionValueVirtual } from './single-expression';
import { JOperator, JOperatorVirtual } from './operator';
/** $ _import $ **/

export interface JReturnStatement {
    type: 'ReturnStatement';
    _return: JKeyword;
    value?: JSingleExpressionValue;
    semi?: JOperator;
    /** $ childType $ **/
}

export interface JReturnStatementVirtual {
    type: 'ReturnStatement';
    _return?: JKeywordVirtual;
    value?: JSingleExpressionValueVirtual;
    semi?: JOperatorVirtual;
    /** $ childVirtualType $ **/
}

export function _JReturnStatement (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JReturnStatementVirtual>(mapping, 'ReturnStatement');
    if (parentName === 'Block') {
        const [_parent] = getContextWithJNodeMapping<JBlockVirtual>(mapping, parentName);
        _parent.values.push(child);
    }
    children.splice(index, 1);
}
