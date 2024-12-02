import { genSingleExpressionString } from '@vv/javascript';
import { VInterpolation } from '../../lezer';

export function genVInterpolationString (
    ast: VInterpolation
) {
    const expression = genSingleExpressionString(ast.value);
    return '{{ ' + expression + ' }}';
}
