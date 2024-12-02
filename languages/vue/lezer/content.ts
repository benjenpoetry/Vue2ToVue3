import { VDocumentVirtual } from './document';
import { VElement, VElementVirtual } from './element';
import { VNodeReferenceVirtual } from './entity-reference';
import { VInterpolation, VInterpolationVirtual } from './interpolation';
import { VText, VTextVirtual } from './text';
import { getContextWithVNodeMapping, getElementContextWithNodeMapping, VAstTypeKey, VNodeMapping } from './utils';

export type VContentValue = VText
| VElement
| VInterpolation

export type VContentValueVirtual = VTextVirtual
| VElementVirtual
| VInterpolationVirtual
| VNodeReferenceVirtual

export interface VContent {
    type: 'Content';
    values: VContentValue[];
}

export interface VContentVirtual {
    type: 'Content';
    values?: VContentValueVirtual[];
}

export function _VContent (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    parentFrom: number,
    parentTo: number
) {
    const [child, index, children] = getContextWithVNodeMapping<VContentVirtual>(mapping, 'Content');
    if (parentName === 'Document') {
        const [_parent] = getContextWithVNodeMapping<VDocumentVirtual>(mapping, parentName);
        _parent.values.push(child);
    }

    if (parentName === 'Element') {
        // const [_parent] = getContextWithVNodeMapping<VElementVirtual>(mapping, parentName);
        const [_parent] = getElementContextWithNodeMapping(mapping, parentFrom, parentTo);
        _parent.nodes?.push(child);
    }

    children.splice(index, 1);
}
