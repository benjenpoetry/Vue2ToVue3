import { genVElementString } from './element';
import { VContent } from '../../lezer';
import { genVInterpolationString } from './interpolation';
import { genVTextString } from './text';

export function genVContentString (ast: VContent): string {
    const values = ast.values;
    const strings: string[] = [];
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value.type === 'Text') {
            strings.push(genVTextString(value));
            continue;
        }
        if (value.type === 'Interpolation') {
            strings.push(genVInterpolationString(value));
            continue;
        }
        if (value.type === 'Element') {
            strings.push(genVElementString(value));
        }
    }
    return strings.join('');
}
