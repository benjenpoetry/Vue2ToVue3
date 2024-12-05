import { Range } from 'vscode-languageserver-protocol';
import { JArrayExpressionVirtual } from './array-expression';
import { JArrowFunctionVirtual } from './arrow-function';
import { JAssignmentExpressionVirtual } from './assignment-expression';
import { JAwaitExpressionVirtual } from './await-expression';
import { JBinaryExpressionVirtual } from './binary-expression';
import { JClassExpressionVirtual } from './class-expression';
import { JConditionalExpressionVirtual } from './conditional-expression';
import { JNewExpressionVirtual } from './new-expression';
import { JParenthesizedExpressionVirtual } from './parenthesized-expression';
import { JPostfixExpressionVirtual } from './postfix-expression';
import { JPropertyVirtual } from './property';
import { JSingleExpressionVirtual } from './single-expression';
import { JUnaryExpressionVirtual } from './unary-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JYieldExpressionVirtual } from './yield-expression';
import { JArgListVirtual } from './arg-list';
import { JDynamicImportVirtual } from './dynamic-import';
/** $ _import $ **/

export interface JVariableName {
    type: 'VariableName';
    value: string;
    range: Range
    /** $ childType $ **/
}

export interface JVariableNameVirtual {
    type: 'VariableName';
    value?: string;
    range?: Range
    /** $ childVirtualType $ **/
}

export function _JVariableName (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JVariableNameVirtual>(mapping, 'VariableName');
    child.value = value;
    child.range = range;
    children.splice(index, 1);

    if (parentName === 'ArgList') {
        const [_parent] = getContextWithJNodeMapping<JArgListVirtual>(mapping, parentName);
        _parent.values.push(child);
    }
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ArrayExpression') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    if (parentName === 'Property') {
        const [_parent] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, parentName);
        _parent.value.expression = child;
    }
    if (parentName === 'NewExpression') {
        const [_parent] = getContextWithJNodeMapping<JNewExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'UnaryExpression') {
        const [_parent] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'YieldExpression') {
        const [_parent] = getContextWithJNodeMapping<JYieldExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'AwaitExpression') {
        const [_parent] = getContextWithJNodeMapping<JAwaitExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ParenthesizedExpression') {
        const [_parent] = getContextWithJNodeMapping<JParenthesizedExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ClassExpression') {
        const [_parent] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, parentName);
        _parent._extendsExpression = child;
    }
    if (parentName === 'ArrowFunction') {
        const [_parent] = getContextWithJNodeMapping<JArrowFunctionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'BinaryExpression') {
        const [_parent] = getContextWithJNodeMapping<JBinaryExpressionVirtual>(mapping, parentName);
        if (_parent.left) {
            _parent.right = child;
        } else {
            _parent.left = child;
        }
    }
    if (parentName === 'ConditionalExpression') {
        const [_parent] = getContextWithJNodeMapping<JConditionalExpressionVirtual>(mapping, parentName);
        if (_parent.left) {
            _parent.right = child;
        } else {
            _parent.left = child;
        }
    }
    if (parentName === 'AssignmentExpression') {
        const [_parent] = getContextWithJNodeMapping<JAssignmentExpressionVirtual>(mapping, parentName);
        if (_parent.left) {
            _parent.right = child;
        } else {
            _parent.left = child;
        }
    }
    if (parentName === 'PostfixExpression') {
        const [_parent] = getContextWithJNodeMapping<JPostfixExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'DynamicImport') {
        const [_parent] = getContextWithJNodeMapping<JDynamicImportVirtual>(mapping, parentName);
        _parent.value = child;
    }
    callback();
}
