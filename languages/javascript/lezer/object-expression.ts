import { JOperator, JOperatorVirtual } from './operator';
import { JSingleExpressionValue, JSingleExpressionValueVirtual, JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JPropertyVirtual } from './property';
import { JReturnStatementVirtual } from './return-statement';
import { JExportDeclarationVirtual } from './export-declaration';
import { JPropertyDefinition, JPropertyDefinitionVirtual } from './property-definition';
import { JParamList, JParamListVirtual } from './param-list';
import { JBlock, JBlockVirtual } from './block';
/** $ _import $ **/

export type JObjectExpressionValue = JObjectExpressionProperty
| JObjectExpressionFunction

export type JObjectExpressionValueValueVirtual = JObjectExpressionPropertyVirtual
| JObjectExpressionFunctionVirtual

export interface JObjectExpressionValueVirtual {
    type?: 'property' | 'function';
    property?: JPropertyVirtual;
    colon?: JOperatorVirtual;
    definition?: JPropertyDefinitionVirtual;
    paramList?: JParamListVirtual;
    block?: JBlockVirtual;
    value?: JSingleExpressionValueVirtual;
}

export interface JObjectExpressionProperty {
    type: 'property';
    colon: JOperator;
    definition: JPropertyDefinition;
    value: JSingleExpressionValue;
}

export interface JObjectExpressionPropertyVirtual {
    type: 'property';
    property?: JPropertyVirtual;
    colon?: JOperatorVirtual;
    value?: JSingleExpressionValueVirtual;
}

export interface JObjectExpressionFunction {
    type: 'function'
    colon: JOperator;
    definition: JPropertyDefinition;
    paramList: JParamList;
    block: JBlock;
}

export interface JObjectExpressionFunctionVirtual {
    type: 'function';
    definition?: JPropertyDefinitionVirtual;
    paramList?: JParamListVirtual;
    block?: JBlockVirtual;
}

export interface JObjectExpression {
    type: 'ObjectExpression';
    start: JOperator;
    end: JOperator;
    values: JObjectExpressionValue[];
    commas: JOperator[];
    /** $ childType $ **/
}

export interface JObjectExpressionVirtual {
    type: 'ObjectExpression';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    values: JObjectExpressionValueVirtual[];
    index: number;
    commas: JOperatorVirtual[];
    /** $ childVirtualType $ **/
}

export function genJSObjectExpressionValue (ast: JObjectExpressionValueVirtual): JObjectExpressionValueVirtual {
    if (ast.property?.value.paramList) {
        return {
            type: 'function',
            paramList: ast.property.value.paramList,
            block: ast.property.value.block,
            definition: ast.property.value.definition
        };
    } else {
        return {
            type: 'property',
            definition: ast.property?.value.definition,
            value: ast.property?.value.expression
        };
    }
}

export function _JObjectExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JObjectExpressionVirtual>(mapping, 'ObjectExpression');
    for (let i = 0; i < child.values.length; i++) {
        child.values[i] = genJSObjectExpressionValue(child.values[i]);
    }

    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ReturnStatement') {
        const [_parent] = getContextWithJNodeMapping<JReturnStatementVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ExportDeclaration') {
        const [_parent] = getContextWithJNodeMapping<JExportDeclarationVirtual>(mapping, parentName);
        if (_parent.value?.type === 'ExportDefault') {
            _parent.value.value = child;
        }
    }
    children.splice(index, 1);
}
