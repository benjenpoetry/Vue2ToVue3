import { VAttributeVirtual } from './attribute';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VAttributeName {
    type: 'AttributeName';
    value: string
    /** $ childType $ **/
}

export interface VAttributeNameVirtual {
    type: 'AttributeName';
    value?: string
    /** $ childVirtualType $ **/
}

export function _VAttributeName (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VAttributeNameVirtual>(mapping, 'AttributeName');
    child.value = value;
    if (parentName === 'Attribute') {
        const [_parent] = getContextWithVNodeMapping<VAttributeVirtual>(mapping, parentName);
        _parent.attributeName = child;
    }
    children.splice(index, 1);
    callback();
}
