import { JScriptVirtual, JSingleExpression, JSingleExpressionVirtual } from '@vv/javascript';
import { getContextWithVNodeMapping, getElementContextWithNodeMapping, getElementFromRange, VAstTypeKey, VNodeMapping } from './utils';
import { VInterpolationVirtual } from './interpolation';

export type VSingleExpression = JSingleExpression;

export function _VSingleExpression (
    mapping: VNodeMapping,
    parentName: VAstTypeKey
) {
    const [child, index, children] = getContextWithVNodeMapping<JSingleExpressionVirtual>(mapping, 'SingleExpression');
    if (parentName === 'Interpolation') {
        const [_parent] = getContextWithVNodeMapping<VInterpolationVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}

export function _VScript (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    parentFrom: number,
    parentTo: number
) {
    const [child, index, children] = getContextWithVNodeMapping<JScriptVirtual>(mapping, 'Script');
    if (parentName === 'Element') {
        const [_parent] = getElementContextWithNodeMapping(mapping, parentFrom, parentTo);
        _parent.script = child;
    }
    // if (parentName === 'Interpolation') {
    //     const [_parent] = getContextWithVNodeMapping<VInterpolationVirtual>(mapping, parentName);
    //     _parent.value = child;
    // }
    children.splice(index, 1);
}
