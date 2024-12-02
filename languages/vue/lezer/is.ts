import { VAttributeVirtual } from './attribute';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VIs {
    type: 'Is';
    value: string
    /** $ childType $ **/
}

export interface VIsVirtual {
    type: 'Is';
    value?: string
    /** $ childVirtualType $ **/
}

export function _VIs (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VIsVirtual>(mapping, 'Is');
    child.value = value;
    if (parentName === 'Attribute') {
        const [_parent] = getContextWithVNodeMapping<VAttributeVirtual>(mapping, parentName);
        _parent.is = child;
    }
    children.splice(index, 1);
    callback();
}
