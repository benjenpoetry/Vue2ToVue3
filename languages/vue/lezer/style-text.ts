import {
    getContextWithVNodeMapping,
    getElementContextWithNodeMapping,
    VAstTypeKey,
    VNodeMapping
} from './utils';
/** $ _import $ **/

export interface VStyleText {
    type: 'StyleText';
    value: string
    /** $ childType $ **/
}

export interface VStyleTextVirtual {
    type: 'StyleText';
    value?: string
    /** $ childVirtualType $ **/
}

export function _VStyleText (
    mapping: VNodeMapping,
    parentName: VAstTypeKey,
    value: string,
    callback: () => void,
    parentFrom: number,
    parentTo: number
) {
    const [child, index, children] = getContextWithVNodeMapping<VStyleTextVirtual>(mapping, 'StyleText');
    child.value = value;
    if (parentName === 'Element') {
        const [parent] = getElementContextWithNodeMapping(mapping, parentFrom, parentTo);
        parent.styleText = child;
    }
    children.splice(index, 1);
    callback();
}
