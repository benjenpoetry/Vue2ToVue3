import { VOpenTagVirtual } from './open-tag';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
import { VAttributeName, VAttributeNameVirtual } from './attribute-name';
import { VIs, VIsVirtual } from './is';
import { VAttributeValue, VAttributeValueVirtual } from './attribute-value';
/** $ _import $ **/

export interface VAttribute {
    type: 'Attribute';
    attributeName: VAttributeName;
    is?: VIs;
    attributeValue?: VAttributeValue;
    /** $ childType $ **/
}

export interface VAttributeVirtual {
    type: 'Attribute';
    attributeName?: VAttributeNameVirtual;
    is?: VIsVirtual;
    attributeValue?: VAttributeValueVirtual;
    /** $ childVirtualType $ **/
}

export function _VAttribute (
    mapping: VNodeMapping,
    parentName: VAstTypeKey
) {
    const [child, index, children] = getContextWithVNodeMapping<VAttributeVirtual>(mapping, 'Attribute');
    if (parentName === 'OpenTag') {
        const [_parent] = getContextWithVNodeMapping<VOpenTagVirtual>(mapping, parentName);
        _parent.attributes?.push(child);
    }
    children.splice(index, 1);
}
