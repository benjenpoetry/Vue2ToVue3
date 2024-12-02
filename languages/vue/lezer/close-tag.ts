import {
    getContextWithVNodeMapping,
    getElementContextWithNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
import { VStartCloseTag, VStartCloseTagVirtual } from './start-close-tag';
import { VTagName, VTagNameVirtual } from './tag-name';
import { VEndTag, VEndTagVirtual } from './end-tag';
/** $ _import $ **/

export interface VCloseTag {
    type: 'CloseTag';
    startCloseTag: VStartCloseTag;
    tagName: VTagName;
    endTag: VEndTag;
    /** $ childType $ **/
}

export interface VCloseTagVirtual {
    type: 'CloseTag';
    startCloseTag?: VStartCloseTagVirtual;
    tagName?: VTagNameVirtual;
    endTag?: VEndTagVirtual;
    /** $ childVirtualType $ **/
}

export function _VCloseTag (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    from: number,
    to: number
) {
    const [child, index, children] = getContextWithVNodeMapping<VCloseTagVirtual>(mapping, 'CloseTag');
    if (parentName === 'Element') {
        const [_parent] = getElementContextWithNodeMapping(mapping, from, to);
        _parent.closeTag = child;
    }
    children.splice(index, 1);
}
