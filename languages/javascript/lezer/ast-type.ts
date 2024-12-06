import { JSingleExpression } from './single-expression';
import { JNumber } from './number';
import { JString } from './string';
import { JVariableName } from './variable-name';
import { JTemplateString } from './template-string';
import { JScript } from './script';
import { JBooleanLiteral } from './boolean-literal';
import { JKeyword } from './keyword';
import { JRegExp } from './reg-exp';
import { JArrayExpression } from './array-expression';
import { JOperator } from './operator';
import { JSpread } from './spread';
import { JObjectExpression } from './object-expression';
import { JProperty } from './property';
import { JPropertyDefinition } from './property-definition';
import { JParamList } from './param-list';
import { JBlock } from './block';
import { JNewTarget } from './new-target';
import { JPropertyName } from './property-name';
import { JNewExpression } from './new-expression';
import { JArgList } from './arg-list';
import { JUnaryExpression } from './unary-expression';
import { JLogicOp } from './logic-op';
import { JYieldExpression } from './yield-expression';
import { JStar } from './star';
import { JAwaitExpression } from './await-expression';
import { JParenthesizedExpression } from './parenthesized-expression';
import { JClassExpression } from './class-expression';
import { JVariableDefinition } from './variable-definition';
import { JClassBody } from './class-body';
import { JFunctionExpression } from './function-expression';
import { JArrowFunction } from './arrow-function';
import { JArrow } from './arrow';
import { JExportDeclaration } from './export-declaration';
import { JReturnStatement } from './return-statement';
import { JMemberExpression } from './member-expression';
import { JBinaryExpression } from './binary-expression';
import { JArithOp } from './arith-op';
import { JConditionalExpression } from './conditional-expression';
import { JAssignmentExpression } from './assignment-expression';
import { JUpdateOp } from './update-op';
import { JEquals } from './equals';
import { JPostfixExpression } from './postfix-expression';
import { JCallExpression } from './call-expression';
import { JDynamicImport } from './dynamic-import';
import { JImportMeta } from './import-meta';
import { JImportDeclaration } from './import-declaration';
import { JImportGroup } from './import-group';
/** $ _import $ **/

export type JAstType = JSingleExpression
| JNumber
| JString
| JVariableName
| JTemplateString
| JScript
| JBooleanLiteral
| JRegExp
| JArrayExpression
| JSpread
| JObjectExpression
| JProperty
| JPropertyDefinition
| JParamList
| JBlock
| JNewTarget
| JPropertyName
| JNewExpression
| JArgList
| JUnaryExpression
| JLogicOp
| JYieldExpression
| JStar
| JAwaitExpression
| JParenthesizedExpression
| JClassExpression
| JVariableDefinition
| JClassBody
| JFunctionExpression
| JArrowFunction
| JArrow
| JExportDeclaration
| JReturnStatement
| JMemberExpression
| JBinaryExpression
| JArithOp
| JConditionalExpression
| JAssignmentExpression
| JUpdateOp
| JEquals
| JPostfixExpression
| JCallExpression
| JDynamicImport
| JImportMeta
| JImportDeclaration
| JImportGroup
/** $ type $ **/
| JKeyword
| JOperator
