import { Range } from 'vscode-languageserver-protocol';
import { getContextWithJNodeMapping, JAstTypeKey, JNodeMapping } from './utils';
import { JSingleExpressionVirtual } from './single-expression';
import { JArrayExpressionVirtual } from './array-expression';
import { JNewTargetVirtual } from './new-target';
import { JUnaryExpressionVirtual } from './unary-expression';
import { JYieldExpressionVirtual } from './yield-expression';
import { JAwaitExpressionVirtual } from './await-expression';
import { JClassExpressionVirtual } from './class-expression';
import { JFunctionExpressionVirtual } from './function-expression';
import { JExportDeclarationVirtual } from './export-declaration';
import { JReturnStatementVirtual } from './return-statement';
import { JMemberExpressionVirtual } from './member-expression';
import { JDynamicImportVirtual } from './dynamic-import';
import { JImportMetaVirtual } from './import-meta';
import { JImportDeclarationVirtual } from './import-declaration';
/** $ _import $ **/

export interface JKeyword {
    type: 'Keyword';
    value: string;
    range: Range;
}

export interface JKeywordVirtual {
    type: 'Keyword';
    value?: string;
    range?: Range;
}

export const JKeywords = [
    'super',
    'null',
    'new',
    'void',
    'typeof',
    'delete',
    'yield',
    'await',
    'class',
    'extends',
    'async',
    'function',
    'export',
    'default',
    'return',
    'import',
    'from',
    /** $ kVar $ **/
    'this'
];

export function isJKeyword (key: string) {
    return JKeywords.some(it => it === key);
}

export function _JKeyword (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JKeywordVirtual>(mapping, 'Keyword');
    child.value = value;
    child.range = range;

    if (parentName === 'SingleExpression' && value === 'this') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'SingleExpression' && value === 'super') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'SingleExpression' && value === 'null') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }

    if (parentName === 'MemberExpression' && value === 'this') {
        const [_parent] = getContextWithJNodeMapping<JMemberExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'MemberExpression' && value === 'super') {
        const [_parent] = getContextWithJNodeMapping<JMemberExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'MemberExpression' && value === 'null') {
        const [_parent] = getContextWithJNodeMapping<JMemberExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }

    if (parentName === 'ArrayExpression' && value === 'this') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    if (parentName === 'ArrayExpression' && value === 'super') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    if (parentName === 'ArrayExpression' && value === 'null') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }

    if (parentName === 'NewTarget' && value === 'new') {
        const [_parent] = getContextWithJNodeMapping<JNewTargetVirtual>(mapping, parentName);
        _parent._new = child;
    }

    if (parentName === 'UnaryExpression' && value === 'void') {
        const [_parent] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, parentName);
        _parent.prefix = child;
    }

    if (parentName === 'UnaryExpression' && value === 'typeof') {
        const [_parent] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, parentName);
        _parent.prefix = child;
    }

    if (parentName === 'UnaryExpression' && value === 'delete') {
        const [_parent] = getContextWithJNodeMapping<JUnaryExpressionVirtual>(mapping, parentName);
        _parent.prefix = child;
    }
    if (parentName === 'YieldExpression' && value === 'yield') {
        const [_parent] = getContextWithJNodeMapping<JYieldExpressionVirtual>(mapping, parentName);
        _parent._yield = child;
    }
    if (parentName === 'AwaitExpression' && value === 'await') {
        const [_parent] = getContextWithJNodeMapping<JAwaitExpressionVirtual>(mapping, parentName);
        _parent._await = child;
    }
    if (parentName === 'ClassExpression' && value === 'class') {
        const [_parent] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, parentName);
        _parent._class = child;
    }
    if (parentName === 'ClassExpression' && value === 'extends') {
        const [_parent] = getContextWithJNodeMapping<JClassExpressionVirtual>(mapping, parentName);
        _parent._extends = child;
    }
    if (parentName === 'FunctionExpression' && value === 'async') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent._async = child;
    }
    if (parentName === 'FunctionExpression' && value === 'function') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent._function = child;
    }
    if (parentName === 'ExportDeclaration' && value === 'export') {
        const [_parent] = getContextWithJNodeMapping<JExportDeclarationVirtual>(mapping, parentName);
        _parent.value = {
            type: 'ExportDefault',
            _export: child
        };
    }
    if (parentName === 'ExportDeclaration' && value === 'default') {
        const [_parent] = getContextWithJNodeMapping<JExportDeclarationVirtual>(mapping, parentName);
        if (_parent.value?.type === 'ExportDefault') {
            _parent.value._default = child;
        }
    }
    if (parentName === 'ReturnStatement' && value === 'return') {
        const [_parent] = getContextWithJNodeMapping<JReturnStatementVirtual>(mapping, parentName);
        _parent._return = child;
    }
    if (parentName === 'DynamicImport' && value === 'import') {
        const [_parent] = getContextWithJNodeMapping<JDynamicImportVirtual>(mapping, parentName);
        _parent._import = child;
    }
    if (parentName === 'ImportMeta' && value === 'import') {
        const [_parent] = getContextWithJNodeMapping<JImportMetaVirtual>(mapping, parentName);
        _parent._import = child;
    }
    if (parentName === 'ImportDeclaration' && value === 'import') {
        const [_parent] = getContextWithJNodeMapping<JImportDeclarationVirtual>(mapping, parentName);
        _parent._import = child;
    }
    if (parentName === 'ImportDeclaration' && value === 'from') {
        const [_parent] = getContextWithJNodeMapping<JImportDeclarationVirtual>(mapping, parentName);
        _parent._from = child;
    }
    /** $ kFun $ **/

    children.splice(index, 1);
    callback();
}
