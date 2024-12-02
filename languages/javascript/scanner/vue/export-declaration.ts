import {
    JExportDeclaration,
    JObjectExpression,
    JObjectExpressionFunction,
    JObjectExpressionProperty,
    JObjectExpressionValue
} from '../../lezer';

import { genSingleExpressionValueString } from './spawn';
import { _Vue, _VueData } from './vue';

export function genVueExportDefault (
    ast: JExportDeclaration,
    vue: _Vue
) {
    const value = ast.value;

    if (value.type === 'ExportDefault' && value.value.type === 'ObjectExpression') {
        const vueProps = value.value.values;
        for (let i = 0; i < vueProps.length; i++) {
            const property = vueProps[i];
            genVueProperty(property, vue);
        }
    }
}
function genVueProperty (ast: JObjectExpressionValue, vue: _Vue) {
    const definition = ast.definition;
    /**
     * 定义 name
     * **/
    if (definition.value === 'name' && ast.type === 'property') {
        vue.name = genVueName(ast);
    }
    /**
     * vue data
     * **/
    if (definition.value === 'data' && ast.type === 'function') {
        const data = genVueData(ast);
        if (data.length) {
            vue.imports.push('ref');
        }
        vue.data = data;
    }
}

function genVueName (ast: JObjectExpressionProperty) {
    const value = genSingleExpressionValueString(ast.value);
    return value;
}

function genVueData (
    ast: JObjectExpressionFunction
): _VueData[] {
    const vueData: _VueData[] = [];
    const statements = ast.block.values;
    for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (statement.type === 'ReturnStatement' && statement.value?.type === 'ObjectExpression') {
            objectExpression(statement.value);
        }
    }
    return vueData;

    function objectExpression (expression: JObjectExpression) {
        const values = expression.values;
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            if (value.type === 'property') {
                const data = doObjectExpressionProperty(value);
                vueData.push(data);
            }
        }
    }
}

function doObjectExpressionProperty (
    ast: JObjectExpressionProperty
): _VueData {
    const name = ast.definition.value;
    const value = genSingleExpressionValueString(ast.value);
    return {
        name,
        value
    };
}
