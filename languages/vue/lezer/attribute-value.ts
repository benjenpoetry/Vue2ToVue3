import { VAttributeVirtual } from './attribute';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VAttributeValue {
    type: 'AttributeValue';
    value: string
    /** $ childType $ **/
}

export interface VAttributeValueVirtual {
    type: 'AttributeValue';
    value?: string
    /** $ childVirtualType $ **/
}

export function _VAttributeValue (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VAttributeValueVirtual>(mapping, 'AttributeValue');
    child.value = value;
    if (parentName === 'Attribute') {
        const [_parent] = getContextWithVNodeMapping<VAttributeVirtual>(mapping, parentName);
        _parent.attributeValue = child;
    }
    children.splice(index, 1);
    callback();
}
