import { VContentVirtual } from './content';
import { getContextWithVNodeMapping, VAstTypeKey, VNodeMapping } from './utils';

export interface VNodeReference {
    type: 'NodeReference';
}

export interface VNodeReferenceVirtual {
    type: 'NodeReference';
}

export function _VNodeReference (
    mapping: VNodeMapping,
    parentName: VAstTypeKey
) {
    const [child, index, children] = getContextWithVNodeMapping<VNodeReferenceVirtual>(mapping, 'NodeReference');
    if (parentName === 'Content') {
        const [_parent] = getContextWithVNodeMapping<VContentVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    children.splice(index, 1);
}
