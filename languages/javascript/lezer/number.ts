import { Range } from 'vscode-languageserver-protocol';
import { JArrayExpressionVirtual } from './array-expression';
import { JBinaryExpressionVirtual } from './binary-expression';
import { JPropertyVirtual } from './property';
import { JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JNumber {
    type: 'Number';
    value: string;
    range: Range;
    /** $ childType $ **/
}

export interface JNumberVirtual {
    type: 'Number';
    value?: string;
    range?: Range;
    /** $ childVirtualType $ **/
}

export function _JNumber (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JNumberVirtual>(mapping, 'Number');

    child.value = value;
    child.range = range;

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

    if (parentName === 'BinaryExpression') {
        const [_parent] = getContextWithJNodeMapping<JBinaryExpressionVirtual>(mapping, parentName);
        if (_parent.left) {
            _parent.right = child;
        } else {
            _parent.left = child;
        }
    }

    callback();
    children.splice(index, 1);
}
