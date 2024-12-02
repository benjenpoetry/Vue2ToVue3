import { VCloseTagVirtual } from './close-tag';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VStartCloseTag {
    type: 'StartCloseTag';
    value: string
    /** $ childType $ **/
}

export interface VStartCloseTagVirtual {
    type: 'StartCloseTag';
    value?: string
    /** $ childVirtualType $ **/
}

export function _VStartCloseTag (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VStartCloseTagVirtual>(mapping, 'StartCloseTag');
    child.value = value;
    if (parentName === 'CloseTag') {
        const [_parent] = getContextWithVNodeMapping<VCloseTagVirtual>(mapping, parentName);
        _parent.startCloseTag = child;
    }
    children.splice(index, 1);
    callback();
}
