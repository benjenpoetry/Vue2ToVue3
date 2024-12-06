import { JScriptVirtual } from './script';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JVariableDefinition, JVariableDefinitionVirtual } from './variable-definition';
import { JString, JStringVirtual } from './string';
import { JImportGroup, JImportGroupVirtual } from './import-group';
/** $ _import $ **/

export type JImportDeclarationValue = JImportGroup | JVariableDefinition;
export type JImportDeclarationValueVirtual = JImportGroupVirtual | JVariableDefinitionVirtual;

export interface JImportDeclaration {
    type: 'ImportDeclaration';
    _import: JKeyword;
    source: JString;
    value: JImportDeclarationValue
    _from?: JKeyword;
    /** $ childType $ **/
}

export interface JImportDeclarationVirtual {
    type: 'ImportDeclaration';
    _import?: JKeywordVirtual;
    source?: JStringVirtual;
    value?: JImportDeclarationValueVirtual;
    _from?: JKeywordVirtual;
    /** $ childVirtualType $ **/
}

export function _JImportDeclaration (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JImportDeclarationVirtual>(mapping, 'ImportDeclaration');
    children.splice(index, 1);

    if (parentName === 'Script') {
        const [_parent] = getContextWithJNodeMapping<JScriptVirtual>(mapping, parentName);
        _parent.values.push(child);
    }
}
