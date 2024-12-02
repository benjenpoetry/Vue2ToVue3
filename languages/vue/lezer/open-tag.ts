import {
    getContextWithVNodeMapping,
    getElementContextWithNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
import { VStartTag, VStartTagVirtual } from './start-tag';
import { VTagName, VTagNameVirtual } from './tag-name';
import { VEndTag, VEndTagVirtual } from './end-tag';
import { VAttribute, VAttributeVirtual } from './attribute';
/** $ _import $ **/

export interface VOpenTag {
    type: 'OpenTag';
    startTag: VStartTag;
    tagName: VTagName;
    endTag: VEndTag;
    attributes: VAttribute[];
    /** $ childType $ **/
}

export interface VOpenTagVirtual {
    type: 'OpenTag';
    startTag?: VStartTagVirtual;
    tagName?: VTagNameVirtual;
    endTag?: VEndTagVirtual;
    attributes: VAttributeVirtual[];
    /** $ childVirtualType $ **/
}

export function _VOpenTag (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    parentFrom: number,
    parentTo: number
) {
    const [child, index, children] = getContextWithVNodeMapping<VOpenTagVirtual>(mapping, 'OpenTag');
    if (parentName === 'Element') {
        const [_parent] = getElementContextWithNodeMapping(mapping, parentFrom, parentTo);
        _parent.openTag = child;
    }
    children.splice(index, 1);
}
