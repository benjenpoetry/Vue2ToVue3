import { JImportMetaVirtual } from './import-meta';
import { JNewTargetVirtual } from './new-target';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
/** $ _import $ **/

export interface JPropertyName {
    type: 'PropertyName';
    value: string;
    /** $ childType $ **/
}

export interface JPropertyNameVirtual {
    type: 'PropertyName';
    value?: string;
    /** $ childVirtualType $ **/
}

export function _JPropertyName (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JPropertyNameVirtual>(mapping, 'PropertyName');
    child.value = value;
    children.splice(index, 1);

    if (parentName === 'NewTarget') {
        const [_parent] = getContextWithJNodeMapping<JNewTargetVirtual>(mapping, parentName);
        _parent.propertyName = child;
    }

    if (parentName === 'MemberExpression') {
        const [_parent] = getContextWithJNodeMapping<JNewTargetVirtual>(mapping, parentName);
        _parent.propertyName = child;
    }

    if (parentName === 'ImportMeta') {
        const [_parent] = getContextWithJNodeMapping<JImportMetaVirtual>(mapping, parentName);
        _parent.propertyName = child;
    }

    callback();
}
