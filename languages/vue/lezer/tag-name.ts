import { VCloseTagVirtual } from './close-tag';
import { VOpenTagVirtual } from './open-tag';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VTagName {
    type: 'TagName';
    value: string;
    /** $ childType $ **/
}

export interface VTagNameVirtual {
    type: 'TagName';
    value?: string;
    /** $ childVirtualType $ **/
}

export function _VTagName (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VTagNameVirtual>(mapping, 'TagName');
    child.value = value;
    if (parentName === 'OpenTag') {
        const [_parent] = getContextWithVNodeMapping<VOpenTagVirtual>(mapping, parentName);
        _parent.tagName = child;
    }

    if (parentName === 'CloseTag') {
        const [_parent] = getContextWithVNodeMapping<VCloseTagVirtual>(mapping, parentName);
        _parent.tagName = child;
    }
    children.splice(index, 1);
    callback();
}
