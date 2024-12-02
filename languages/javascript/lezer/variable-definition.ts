import { JClassExpressionVirtual } from './class-expression';
import { JFunctionExpressionVirtual } from './function-expression';
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
    if (parentName === 'ClassExpression') {
        const [_parent] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, parentName);
        _parent.variableDefinition = child;
    }
    if (parentName === 'FunctionExpression') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent.variableDefinition = child;
    }
    children.splice(index, 1);
    callback();
}
