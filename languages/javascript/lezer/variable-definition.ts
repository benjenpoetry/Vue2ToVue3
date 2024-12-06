import { JClassExpressionVirtual } from './class-expression';
import { JFunctionExpressionVirtual } from './function-expression';
import { JImportDeclarationVirtual } from './import-declaration';
import { JImportGroupVirtual } from './import-group';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JVariableDefinition {
    type: 'VariableDefinition';
    value: string
    /** $ childType $ **/
}

export interface JVariableDefinitionVirtual {
    type: 'VariableDefinition';
    value?: string
    /** $ childVirtualType $ **/
}

export function _JVariableDefinition (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JVariableDefinitionVirtual>(mapping, 'VariableDefinition');
    child.value = value;
    children.splice(index, 1);
    if (parentName === 'ClassExpression') {
        const [_parent] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, parentName);
        _parent.variableDefinition = child;
    }
    if (parentName === 'FunctionExpression') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent.variableDefinition = child;
    }
    if (parentName === 'FunctionExpression') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent.variableDefinition = child;
    }
    if (parentName === 'ImportDeclaration') {
        const [_parent] = getContextWithJNodeMapping<JImportDeclarationVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ImportGroup') {
        const [_parent] = getContextWithJNodeMapping<JImportGroupVirtual>(mapping, parentName);
        _parent.values.push(child);
    }
    callback();
}
