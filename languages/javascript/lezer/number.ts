import { JArrayExpressionVirtual } from './array-expression';
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
    /** $ childType $ **/
}

export interface JNumberVirtual {
    type: 'Number';
    value?: string;
    /** $ childVirtualType $ **/
}

export function _JNumber (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JNumberVirtual>(mapping, 'Number');

    child.value = value;

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
        _parent.value.value = child;
    }

    children.splice(index, 1);
    callback();
}
