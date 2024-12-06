import { JSingleExpressionVirtual } from './single-expression';
import { JNumberVirtual } from './number';
import { JStringVirtual } from './string';
import { JVariableNameVirtual } from './variable-name';
import { JTemplateStringVirtual } from './template-string';
import { JScriptVirtual } from './script';
import { JBooleanLiteralVirtual } from './boolean-literal';
import { JKeywordVirtual } from './keyword';
import { JRegExpVirtual } from './reg-exp';
import { JArrayExpressionVirtual } from './array-expression';
import { JOperatorVirtual } from './operator';
import { JSpreadVirtual } from './spread';
import { JObjectExpressionVirtual } from './object-expression';
import { JPropertyVirtual } from './property';
import { JPropertyDefinitionVirtual } from './property-definition';
import { JParamListVirtual } from './param-list';
import { JBlockVirtual } from './block';
import { JNewTargetVirtual } from './new-target';
import { JPropertyNameVirtual } from './property-name';
import { JNewExpressionVirtual } from './new-expression';
import { JArgListVirtual } from './arg-list';
import { JUnaryExpressionVirtual } from './unary-expression';
import { JLogicOpVirtual } from './logic-op';
import { JYieldExpressionVirtual } from './yield-expression';
import { JStarVirtual } from './star';
import { JAwaitExpressionVirtual } from './await-expression';
import { JParenthesizedExpressionVirtual } from './parenthesized-expression';
import { JClassExpressionVirtual } from './class-expression';
import { JVariableDefinitionVirtual } from './variable-definition';
import { JClassBodyVirtual } from './class-body';
import { JFunctionExpressionVirtual } from './function-expression';
import { JArrowFunctionVirtual } from './arrow-function';
import { JArrowVirtual } from './arrow';
import { JExportDeclarationVirtual } from './export-declaration';
import { JReturnStatementVirtual } from './return-statement';
import { JMemberExpressionVirtual } from './member-expression';
import { JBinaryExpressionVirtual } from './binary-expression';
import { JArithOpVirtual } from './arith-op';
import { JConditionalExpressionVirtual } from './conditional-expression';
import { JAssignmentExpressionVirtual } from './assignment-expression';
import { JUpdateOpVirtual } from './update-op';
import { JEqualsVirtual } from './equals';
import { JPostfixExpressionVirtual } from './postfix-expression';
import { JCallExpressionVirtual } from './call-expression';
import { JDynamicImportVirtual } from './dynamic-import';
import { JImportMetaVirtual } from './import-meta';
import { JImportDeclarationVirtual } from './import-declaration';
import { JImportGroupVirtual } from './import-group';
/** $ _import $ **/

export type JAstVirtualType = JSingleExpressionVirtual
| JNumberVirtual
| JStringVirtual
| JVariableNameVirtual
| JTemplateStringVirtual
| JScriptVirtual
| JBooleanLiteralVirtual
| JRegExpVirtual
| JArrayExpressionVirtual
| JSpreadVirtual
| JObjectExpressionVirtual
| JPropertyVirtual
| JPropertyDefinitionVirtual
| JParamListVirtual
| JBlockVirtual
| JNewTargetVirtual
| JPropertyNameVirtual
| JNewExpressionVirtual
| JArgListVirtual
| JUnaryExpressionVirtual
| JLogicOpVirtual
| JYieldExpressionVirtual
| JStarVirtual
| JAwaitExpressionVirtual
| JParenthesizedExpressionVirtual
| JClassExpressionVirtual
| JVariableDefinitionVirtual
| JClassBodyVirtual
| JFunctionExpressionVirtual
| JArrowFunctionVirtual
| JArrowVirtual
| JExportDeclarationVirtual
| JReturnStatementVirtual
| JMemberExpressionVirtual
| JBinaryExpressionVirtual
| JArithOpVirtual
| JConditionalExpressionVirtual
| JAssignmentExpressionVirtual
| JUpdateOpVirtual
| JEqualsVirtual
| JPostfixExpressionVirtual
| JCallExpressionVirtual
| JDynamicImportVirtual
| JImportMetaVirtual
| JImportDeclarationVirtual
| JImportGroupVirtual
/** $ type $ **/
| JKeywordVirtual
| JOperatorVirtual
