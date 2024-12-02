import {
    describe,
    test,
    expect
} from 'vitest';
import { genJsAst } from '..';
import { genFileContents } from './utils';
import { resolve } from 'path';

const path = resolve(__dirname, 'script.js');
const [
    s
] = genFileContents(path);
describe('Script', () => {
    test('s', () => {
        const ast = genJsAst(s, 'Script');
        expect(ast.type).toBe('Script');
    });
});
