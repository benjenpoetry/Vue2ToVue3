import { JImportDeclarationVirtual } from './import-declaration';
import { JOperator, JOperatorVirtual } from './operator';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JVariableDefinition, JVariableDefinitionVirtual } from './variable-definition';
/** $ _import $ **/

export interface JImportGroup {
    type: 'ImportGroup';
    start: JOperator;
    end: JOperator;
    values: JVariableDefinition[];
    /** $ childType $ **/
}

export interface JImportGroupVirtual {
    type: 'ImportGroup';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    values: JVariableDefinitionVirtual[];
    /** $ childVirtualType $ **/
}

export function _JImportGroup (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JImportGroupVirtual>(mapping, 'ImportGroup');
    children.splice(index, 1);

    if (parentName === 'ImportDeclaration') {
        const [_parent] = getContextWithJNodeMapping<JImportDeclarationVirtual>(mapping, parentName);
        _parent.value = child;
    }
}
