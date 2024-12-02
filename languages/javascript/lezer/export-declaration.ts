import { JScriptVirtual } from './script';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JSingleExpressionValue, JSingleExpressionValueVirtual } from './single-expression';
import { JOperator, JOperatorVirtual } from './operator';
/** $ _import $ **/

export interface JExportDefault {
    type: 'ExportDefault';
    _export: JKeyword;
    _default: JKeyword;
    value: JSingleExpressionValue;
    semi?: JOperator;
}

export interface JExportDefaultVirtual {
    type: 'ExportDefault';
    _export?: JKeywordVirtual;
    _default?: JKeywordVirtual;
    value?: JSingleExpressionValueVirtual;
    semi?: JOperatorVirtual;
}

export type JExportDeclarationValue = JExportDefault;
export type JExportDeclarationValueVirtual = JExportDefaultVirtual

export interface JExportDeclaration {
    type: 'ExportDeclaration';
    value: JExportDeclarationValue
    /** $ childType $ **/
}

export interface JExportDeclarationVirtual {
    type: 'ExportDeclaration';
    value?: JExportDeclarationValueVirtual
    /** $ childVirtualType $ **/
}

export function _JExportDeclaration (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JExportDeclarationVirtual>(mapping, 'ExportDeclaration');
    if (parentName === 'Script') {
        const [_parent] = getContextWithJNodeMapping<JScriptVirtual>(mapping, parentName);
        _parent.values.push(child);
    }
    children.splice(index, 1);
}
