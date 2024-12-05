import { Range } from 'vscode-languageserver-protocol';
import { getContextWithJNodeMapping, JAstTypeKey, JNodeMapping } from './utils';
import { JArrayExpressionVirtual } from './array-expression';
import { JObjectExpressionVirtual } from './object-expression';
import { JPropertyVirtual } from './property';
import { JParamListVirtual } from './param-list';
import { JBlockVirtual } from './block';
import { JNewTargetVirtual } from './new-target';
import { JArgListVirtual } from './arg-list';
import { JClassBodyVirtual } from './class-body';
import { JReturnStatementVirtual } from './return-statement';
import { JExportDeclarationVirtual } from './export-declaration';
import { JMemberExpressionVirtual } from './member-expression';
import { JCallExpressionVirtual } from './call-expression';
/** $ _import $ **/

export interface JOperator {
    type: 'Operator';
    value: string;
    range: Range;
}

export interface JOperatorVirtual {
    type: 'Operator';
    value?: string;
    range?: Range;
}

export const JOperators = [
    ']',
    ',',
    '{',
    '}',
    ':',
    '(',
    ')',
    '.',
    '!',
    '~',
    ';',
    '?.',
    /** $ kVar $ **/
    '['
];

export function isJOperator (key: string) {
    return JOperators.some(it => it === key);
}

export function _JOperator (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JOperatorVirtual>(mapping, 'Operator');
    child.value = value;
    child.range = range;

    if (parentName === 'ArrayExpression' && value === '[') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.start = child;
    }
    if (parentName === 'ArrayExpression' && value === ']') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.end = child;
    }
    if (parentName === 'ArrayExpression' && value === ',') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.commas?.push(child);
    }
    if (parentName === 'ObjectExpression' && value === '{') {
        const [_parent] = getContextWithJNodeMapping<JObjectExpressionVirtual>(mapping, parentName);
        _parent.start = child;
    }
    if (parentName === 'ObjectExpression' && value === '}') {
        const [_parent] = getContextWithJNodeMapping<JObjectExpressionVirtual>(mapping, parentName);
        _parent.end = child;
    }

    if (parentName === 'ClassBody' && value === '{') {
        const [_parent] = getContextWithJNodeMapping<JClassBodyVirtual>(mapping, parentName);
        _parent.start = child;
    }
    if (parentName === 'ClassBody' && value === '}') {
        const [_parent] = getContextWithJNodeMapping<JClassBodyVirtual>(mapping, parentName);
        _parent.end = child;
    }

    if (parentName === 'ObjectExpression' && value === ',') {
        const [_parent] = getContextWithJNodeMapping<JObjectExpressionVirtual>(mapping, parentName);
        _parent.commas.push(child);
        _parent.index += 1;
    }

    if (parentName === 'Property' && value === ':') {
        const [_parent] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, parentName);
        _parent.value.type = 'normal';
        _parent.value.colon = child;
    }
    if (parentName === 'ParamList' && value === '(') {
        const [_parent] = getContextWithJNodeMapping<JParamListVirtual>(mapping, parentName);
        _parent.start = child;
    }
    if (parentName === 'ParamList' && value === ')') {
        const [_parent] = getContextWithJNodeMapping<JParamListVirtual>(mapping, parentName);
        _parent.end = child;
    }

    if (parentName === 'ArgList' && value === '(') {
        const [_parent] = getContextWithJNodeMapping<JArgListVirtual>(mapping, parentName);
        _parent.start = child;
    }

    if (parentName === 'ArgList' && value === ')') {
        const [_parent] = getContextWithJNodeMapping<JArgListVirtual>(mapping, parentName);
        _parent.end = child;
    }

    if (parentName === 'ParenthesizedExpression' && value === '(') {
        const [_parent] = getContextWithJNodeMapping<JArgListVirtual>(mapping, parentName);
        _parent.start = child;
    }

    if (parentName === 'ParenthesizedExpression' && value === ')') {
        const [_parent] = getContextWithJNodeMapping<JArgListVirtual>(mapping, parentName);
        _parent.end = child;
    }

    if (parentName === 'Block' && value === '{') {
        const [_parent] = getContextWithJNodeMapping<JBlockVirtual>(mapping, parentName);
        _parent.start = child;
    }
    if (parentName === 'Block' && value === '}') {
        const [_parent] = getContextWithJNodeMapping<JBlockVirtual>(mapping, parentName);
        _parent.end = child;
    }
    if (parentName === 'NewTarget' && value === '.') {
        const [_parent] = getContextWithJNodeMapping<JNewTargetVirtual>(mapping, parentName);
        _parent.dot = child;
    }
    if (parentName === 'ReturnStatement' && value === ';') {
        const [_parent] = getContextWithJNodeMapping<JReturnStatementVirtual>(mapping, parentName);
        _parent.semi = child;
    }
    if (parentName === 'ExportDeclaration' && value === ';') {
        const [_parent] = getContextWithJNodeMapping<JExportDeclarationVirtual>(mapping, parentName);
        if (_parent.value?.type === 'ExportDefault') {
            _parent.value.semi = child;
        }
    }
    if (parentName === 'MemberExpression' && value === '.') {
        const [_parent] = getContextWithJNodeMapping<JMemberExpressionVirtual>(mapping, parentName);
        _parent.chain = child;
    }
    if (parentName === 'CallExpression' && value === '?.') {
        const [_parent] = getContextWithJNodeMapping<JCallExpressionVirtual>(mapping, parentName);
        _parent.questionDot = child;
    }
    /** $ kFun $ **/

    children.splice(index, 1);
    callback();
}
