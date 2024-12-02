import { VContentVirtual } from './content';
import { getContextWithVNodeMapping, getElementContextWithNodeMapping, VAstTypeKey, VNodeMapping } from './utils';

export interface VText {
    type: 'Text';
    value: string;
}

export interface VTextVirtual {
    type: 'Text';
    value?: string
}

export function _VText (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void,
    parentFrom: number,
    parentTo: number
) {
    const [child, index, children] = getContextWithVNodeMapping<VTextVirtual>(mapping, 'Text');
    child.value = value;
    if (parentName === 'Content') {
        const [_parent] = getContextWithVNodeMapping<VContentVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    if (parentName === 'Element') {
        const [_parent] = getElementContextWithNodeMapping(mapping, parentFrom, parentTo);
        _parent.nodes?.push(child);
    }
    children.splice(index, 1);
    callback();
}
