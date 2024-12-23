import { JNumber, JNumberVirtual } from './number';
import { JString, JStringVirtual } from './string';
import { JVariableName, JVariableNameVirtual } from './variable-name';
import { JTemplateString, JTemplateStringVirtual } from './template-string';
import { JBooleanLiteral, JBooleanLiteralVirtual } from './boolean-literal';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JRegExp, JRegExpVirtual } from './reg-exp';
import { JArrayExpression, JArrayExpressionVirtual } from './array-expression';
import { JObjectExpression, JObjectExpressionVirtual } from './object-expression';
import { JNewTarget, JNewTargetVirtual } from './new-target';
import { JNewExpression, JNewExpressionVirtual } from './new-expression';
import { JUnaryExpression, JUnaryExpressionVirtual } from './unary-expression';
import { JYieldExpression, JYieldExpressionVirtual } from './yield-expression';
import { JAwaitExpression, JAwaitExpressionVirtual } from './await-expression';
import { JParenthesizedExpression, JParenthesizedExpressionVirtual } from './parenthesized-expression';
import { JClassExpression, JClassExpressionVirtual } from './class-expression';
import { JFunctionExpression, JFunctionExpressionVirtual } from './function-expression';
import { JArrowFunction, JArrowFunctionVirtual } from './arrow-function';
import { JMemberExpression, JMemberExpressionVirtual } from './member-expression';
import { JBinaryExpression, JBinaryExpressionVirtual } from './binary-expression';
import { JConditionalExpression, JConditionalExpressionVirtual } from './conditional-expression';
import { JAssignmentExpression, JAssignmentExpressionVirtual } from './assignment-expression';
import { JPostfixExpression, JPostfixExpressionVirtual } from './postfix-expression';
import { JCallExpression, JCallExpressionVirtual } from './call-expression';
import { JDynamicImport, JDynamicImportVirtual } from './dynamic-import';
import { JImportMeta, JImportMetaVirtual } from './import-meta';
/** $ _import $ **/

export interface JSingleExpression {
    type: 'SingleExpression';
    value: JSingleExpressionValue;
    /** $ childType $ **/
}

export type JSingleExpressionValue = JNumber
| JString
| JVariableName
| JTemplateString
| JBooleanLiteral
| JKeyword
| JRegExp
| JArrayExpression
| JObjectExpression
| JNewTarget
| JNewExpression
| JUnaryExpression
| JYieldExpression
| JAwaitExpression
| JParenthesizedExpression
| JClassExpression
| JFunctionExpression
| JArrowFunction
| JMemberExpression
| JBinaryExpression
| JConditionalExpression
| JAssignmentExpression
| JPostfixExpression
| JCallExpression
| JDynamicImport
| JImportMeta

export type JSingleExpressionValueVirtual = JNumberVirtual
| JStringVirtual
| JVariableNameVirtual
| JTemplateStringVirtual
| JBooleanLiteralVirtual
| JKeywordVirtual
| JRegExpVirtual
| JArrayExpressionVirtual
| JObjectExpressionVirtual
| JNewTargetVirtual
| JNewExpressionVirtual
| JUnaryExpressionVirtual
| JYieldExpressionVirtual
| JAwaitExpressionVirtual
| JParenthesizedExpressionVirtual
| JClassExpressionVirtual
| JFunctionExpressionVirtual
| JArrowFunctionVirtual
| JMemberExpressionVirtual
| JBinaryExpressionVirtual
| JConditionalExpressionVirtual
| JAssignmentExpressionVirtual
| JPostfixExpressionVirtual
| JCallExpressionVirtual
| JDynamicImportVirtual
| JImportMetaVirtual

export interface JSingleExpressionVirtual {
    type: 'SingleExpression';
    value?: JSingleExpressionValueVirtual;
    /** $ childVirtualType $ **/
}
