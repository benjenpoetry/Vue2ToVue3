import { JPropertyVirtual } from './property';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JPropertyDefinition {
    type: 'PropertyDefinition';
    value: string;
    /** $ childType $ **/
}

export interface JPropertyDefinitionVirtual {
    type: 'PropertyDefinition';
    value?: string;
    /** $ childVirtualType $ **/
}

export function _JPropertyDefinition (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JPropertyDefinitionVirtual>(mapping, 'PropertyDefinition');
    child.value = value;

    if (parentName === 'Property') {
        const [_parent] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, parentName);
        _parent.value.definition = child;
    }

    callback();
    children.splice(index, 1);
}
