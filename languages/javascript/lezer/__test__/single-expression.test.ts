import {
    describe,
    test,
    expect
} from 'vitest';
import { genJsAst } from '..';
import { genFileContents } from './utils';
import { resolve } from 'path';

const path = resolve(__dirname, 'single-expression.t');
const [
    JNumber,
    JString,
    JTemplateString,
    JVariableName,
    JBoolean,
    JThis,
    JNull,
    JSuper,
    JRegExp,
    JArrayExpression1,
    JArrayExpression2,
    JArrayExpression3,
    JArrayExpression4,
    JObjectExpression1,
    JObjectExpression2,
    JObjectExpression3,
    JObjectExpression4,
    JNewTarget,
    JNewExpression1,
    JNewExpression2,
    JUnaryExpression1,
    JUnaryExpression2,
    JYieldExpression,
    JAwaitExpression,
    JParenthesizedExpression,
    JClassExpression,
    JFunctionExpression,
    JArrayExpression,
    JMemberExpression,
    BinaryExpression,
    ConditionalExpression,
    AssignmentExpression,
    AssignmentExpression2
] = genFileContents(path);

describe('SingleExpression', () => {
    // test('Number', () => {
    //     const ast = genJsAst(JNumber);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('String', () => {
    //     const ast = genJsAst(JString);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('TemplateString', () => {
    //     const ast = genJsAst(JTemplateString);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('VariableName', () => {
    //     const ast = genJsAst(JVariableName);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('boolean', () => {
    //     const ast = genJsAst(JBoolean);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('This', () => {
    //     const ast = genJsAst(JThis);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('Null', () => {
    //     const ast = genJsAst(JNull);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('Super', () => {
    //     const ast = genJsAst(JSuper);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('RegExp', () => {
    //     const ast = genJsAst(JRegExp);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JArrayExpression1', () => {
    //     const ast = genJsAst(JArrayExpression1);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JArrayExpression2', () => {
    //     const ast = genJsAst(JArrayExpression2);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JArrayExpression3', () => {
    //     const ast = genJsAst(JArrayExpression3);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JArrayExpression4', () => {
    //     const ast = genJsAst(JArrayExpression4);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JObjectExpression1', () => {
    //     const ast = genJsAst(JObjectExpression1);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JObjectExpression2', () => {
    //     const ast = genJsAst(JObjectExpression2);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JObjectExpression3', () => {
    //     const ast = genJsAst(JObjectExpression3);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JObjectExpression4', () => {
    //     const ast = genJsAst(JObjectExpression4);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JNewTarget', () => {
    //     const ast = genJsAst(JNewTarget);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JNewExpression1', () => {
    //     const ast = genJsAst(JNewExpression1);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JNewExpression2', () => {
    //     const ast = genJsAst(JNewExpression2);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JUnaryExpression1', () => {
    //     const ast = genJsAst(JUnaryExpression1);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JUnaryExpression2', () => {
    //     const ast = genJsAst(JUnaryExpression2);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JYieldExpression', () => {
    //     const ast = genJsAst(JYieldExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JAwaitExpression', () => {
    //     const ast = genJsAst(JAwaitExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JParenthesizedExpression', () => {
    //     const ast = genJsAst(JParenthesizedExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JClassExpression', () => {
    //     const ast = genJsAst(JClassExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JFunctionExpression', () => {
    //     const ast = genJsAst(JFunctionExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JArrayExpression', () => {
    //     const ast = genJsAst(JArrayExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('JMemberExpression', () => {
    //     const ast = genJsAst(JMemberExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('BinaryExpression', () => {
    //     const ast = genJsAst(BinaryExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('ConditionalExpression', () => {
    //     const ast = genJsAst(ConditionalExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    // test('AssignmentExpression', () => {
    //     const ast = genJsAst(AssignmentExpression);
    //     expect(ast.type).toBe('SingleExpression');
    // });
    test('AssignmentExpression2', () => {
        const ast = genJsAst(AssignmentExpression2);
        expect(ast.type).toBe('SingleExpression');
    });
});
