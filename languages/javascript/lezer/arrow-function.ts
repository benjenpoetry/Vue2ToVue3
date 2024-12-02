import { JKeyword, JKeywordVirtual } from './keyword';
import { JParamList, JParamListVirtual } from './param-list';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JBlock, JBlockVirtual } from './block';
import { JArrow, JArrowVirtual } from './arrow';
/** $ _import $ **/

export interface JArrowFunction {
    type: 'ArrowFunction';
    _async?: JKeyword;
    paramList: JParamList;
    value: JBlock | JSingleExpressionValue;
    arrow: JArrow;
    /** $ childType $ **/
}

export interface JArrowFunctionVirtual {
    type: 'ArrowFunction';
    _async?: JKeywordVirtual;
    paramList?: JParamListVirtual;
    value?: JBlockVirtual | JSingleExpressionValueVirtual;
    arrow?: JArrowVirtual;
    /** $ childVirtualType $ **/
}

export function _JArrowFunction (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JArrowFunctionVirtual>(mapping, 'ArrowFunction');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
