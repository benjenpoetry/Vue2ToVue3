import { VCloseTagVirtual } from './close-tag';
import { VOpenTagVirtual } from './open-tag';
import {
    getContextWithVNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VEndTag {
    type: 'EndTag';
    value: string
    /** $ childType $ **/
}

export interface VEndTagVirtual {
    type: 'EndTag';
    value?: string
    /** $ childVirtualType $ **/
}

export function _VEndTag (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithVNodeMapping<VEndTagVirtual>(mapping, 'EndTag');
    child.value = value;
    if (parentName === 'OpenTag') {
        const [_parent] = getContextWithVNodeMapping<VOpenTagVirtual>(mapping, parentName);
        _parent.endTag = child;
    }
    if (parentName === 'CloseTag') {
        const [_parent] = getContextWithVNodeMapping<VCloseTagVirtual>(mapping, parentName);
        _parent.endTag = child;
    }
    children.splice(index, 1);
    callback();
}
