import { resolve } from 'path';
import { genFileContents } from './utils';
import { describe, expect, test } from 'vitest';
import { genVueAst } from '..';
const path = resolve(__dirname, 'vue.t');

const [
    v1
] = genFileContents(path);

describe('vue', () => {
    test('v1', () => {
        const ast = genVueAst(v1);
        expect(ast.type).toBe('Document');
    });
});
