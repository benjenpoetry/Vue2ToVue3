import { VElement, VNodeElement } from '../../lezer';
import { genCloseString } from './close';
import { genVContentString } from './content';
import { genOpenString } from './open';
import { genVTextString } from './text';
export function genVElementString (ast: VElement) {
    const value = ast.value;
    if (value.type === 'NodeElement') {
        return genVNodeElementString(value);
    }
    /**
     * script 和 style 标签会在根目录处理
     * **/
    return '';
}

export function genVNodeElementString (ast: VNodeElement): string {
    const { open, close, values } = ast;

    const strings: string[] = [];
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value.type === 'Content') {
            strings.push(genVContentString(value));
        }
        if (value.type === 'Element') {
            strings.push(genVElementString(value));
        }
        if (value.type === 'Text') {
            strings.push(genVTextString(value));
        }
    }
    const content = strings.join('');

    return genOpenString(open) + content + genCloseString(close);
}
