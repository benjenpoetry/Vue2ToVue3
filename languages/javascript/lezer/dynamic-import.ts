import { JSingleExpressionValue, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
/** $ _import $ **/

export interface JDynamicImport {
    type: 'DynamicImport';
    _import?: JKeyword;
    value: JSingleExpressionValue;
    /** $ childType $ **/
}

export interface JDynamicImportVirtual {
    type: 'DynamicImport';
    _import?: JKeywordVirtual;
    value?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JDynamicImport (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JDynamicImportVirtual>(mapping, 'DynamicImport');
    children.splice(index, 1);

    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
}
