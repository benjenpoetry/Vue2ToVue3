import { JKeyword, JKeywordVirtual } from './keyword';
import { JPropertyName, JPropertyNameVirtual } from './property-name';
import { JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JImportMeta {
    type: 'ImportMeta';
    _import: JKeyword;
    propertyName: JPropertyName;
    /** $ childType $ **/
}

export interface JImportMetaVirtual {
    type: 'ImportMeta';
    _import?: JKeywordVirtual;
    propertyName?: JPropertyNameVirtual
    /** $ childVirtualType $ **/
}

export function _JImportMeta (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JImportMetaVirtual>(mapping, 'ImportMeta');
    children.splice(index, 1);

    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
}
