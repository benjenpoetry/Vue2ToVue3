import { VOpenTagVirtual } from './open-tag';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VStartTag {
    type: 'StartTag';
    value: string;
    /** $ childType $ **/
}

export interface VStartTagVirtual {
    type: 'StartTag';
    value?: string;
    /** $ childVirtualType $ **/
}

export function _VStartTag (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VStartTagVirtual>(mapping, 'StartTag');
    child.value = value;
    if (parentName === 'OpenTag') {
        const [_parent] = getContextWithVNodeMapping<VOpenTagVirtual>(mapping, parentName);
        _parent.startTag = child;
    }
    children.splice(index, 1);
    callback();
}
