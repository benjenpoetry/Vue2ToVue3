import { JSingleExpression, JSingleExpressionValue } from '../../../lezer';
import { genStringString } from './string';

export function genSingleExpressionValueString (ast: JSingleExpressionValue) {
    if (ast.type === 'String') {
        return genStringString(ast);
    }
    if (ast.type === 'VariableName') {
        return ast.value;
    }
    return '';
}

export function genSingleExpressionString (
    ast: JSingleExpression
) {
    return genSingleExpressionValueString(ast.value);
}
