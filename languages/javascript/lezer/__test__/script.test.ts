import {
    describe,
    test,
    expect
} from 'vitest';
import { genJsAst } from '..';
import { genFileContents } from './utils';
import { resolve } from 'path';

const path = resolve(__dirname, 'script.t');
const [
    ExportDeclaration,
    ImportDeclaration,
    S
] = genFileContents(path);
describe('Script', () => {
    // test('ExportDeclaration', () => {
    //     const ast = genJsAst(ExportDeclaration, 'Script');
    //     expect(ast.type).toBe('Script');
    // });
    // test('ImportDeclaration', () => {
    //     const ast = genJsAst(ImportDeclaration, 'Script');
    //     expect(ast.type).toBe('Script');
    // });
    test('S', () => {
        const ast = genJsAst(S, 'Script');
        expect(ast.type).toBe('Script');
    });
});
