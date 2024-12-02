import { JSingleExpression, JSingleExpressionVirtual } from '@vv/javascript';
import { VContentVirtual } from './content';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
import { VOperator, VOperatorVirtual } from './operator';
/** $ _import $ **/

export interface VInterpolation {
    type: 'Interpolation';
    value: JSingleExpression;
    start: VOperator;
    end: VOperator;
    /** $ childType $ **/
}

export interface VInterpolationVirtual {
    type: 'Interpolation';
    value?: JSingleExpressionVirtual;
    start?: VOperatorVirtual;
    end?: VOperatorVirtual;
    /** $ childVirtualType $ **/
}

export function _VInterpolation (
    mapping: VNodeMapping,
    parentName: VAstTypeKey
) {
    const [child, index, children] = getContextWithVNodeMapping<VInterpolationVirtual>(mapping, 'Interpolation');
    if (parentName === 'Content') {
        const [_parent] = getContextWithVNodeMapping<VContentVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    children.splice(index, 1);
}
