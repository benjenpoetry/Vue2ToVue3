import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JVariableDefinition, JVariableDefinitionVirtual } from './variable-definition';
import { JClassBody, JClassBodyVirtual } from './class-body';
/** $ _import $ **/

export interface JClassExpression {
    type: 'ClassExpression';
    _class: JKeyword;
    variableDefinition: JVariableDefinition;
    _extends?: JKeyword;
    _extendsExpression?: JSingleExpressionValue;
    classBody: JClassBody;
    /** $ childType $ **/
}

export interface JClassExpressionVirtual {
    type: 'ClassExpression';
    _class?: JKeywordVirtual;
    variableDefinition?: JVariableDefinitionVirtual;
    _extends?: JKeywordVirtual;
    _extendsExpression?: JSingleExpressionValueVirtual;
    classBody?: JClassBodyVirtual;
    /** $ childVirtualType $ **/
}

export function _JClassExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, 'ClassExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
