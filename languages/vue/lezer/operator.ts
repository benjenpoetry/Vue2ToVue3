/** $ _import $ **/

import { Range } from 'vscode-languageserver-protocol';
import { getContextWithVNodeMapping, VAstTypeKey, VNodeMapping } from './utils';
import { VInterpolationVirtual } from './interpolation';

export const VOperators = [
    '{{',
    '}}'
    /** $ kVar $ **/
];

export interface VOperator {
    type: 'VueOperator';
    value: string;
    range: Range;
}

export interface VOperatorVirtual {
    type: 'VueOperator';
    value?: string;
    range?: Range;
}

export function isVueOperator (value: string) {
    return VOperators.some(it => it === value);
}

export function _VOperator (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VOperatorVirtual>(mapping, 'VueOperator');
    child.value = value;
    child.range = range;
    if (parentName === 'Interpolation' && value === '{{') {
        const [_parent] = getContextWithVNodeMapping<VInterpolationVirtual>(mapping, parentName);
        _parent.start = child;
    }

    if (parentName === 'Interpolation' && value === '}}') {
        const [_parent] = getContextWithVNodeMapping<VInterpolationVirtual>(mapping, parentName);
        _parent.end = child;
    }

    /** $ kFun $ **/

    children.splice(index, 1);
    callback();
}
