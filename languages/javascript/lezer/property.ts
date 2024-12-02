import { JObjectExpressionVirtual } from './object-expression';
import { JOperatorVirtual } from './operator';
import { JPropertyDefinitionVirtual } from './property-definition';
import { JSingleExpressionValueVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JParamListVirtual } from './param-list';
import { JBlockVirtual } from './block';
/** $ _import $ **/

export interface JPropertyValueVirtual {
    type?: 'normal' | 'method';
    colon?: JOperatorVirtual;
    definition?: JPropertyDefinitionVirtual;
    expression?: JSingleExpressionValueVirtual;
    paramList?: JParamListVirtual;
    block?: JBlockVirtual;
}

export interface JProperty {
    type: 'Property';
}

export interface JPropertyVirtual {
    type: 'Property';
    value: JPropertyValueVirtual;
    /** $ childVirtualType $ **/
}

export function _JProperty (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [_child, index, children] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, 'Property');
    if (parentName === 'ObjectExpression') {
        const [_parent] = getContextWithJNodeMapping<JObjectExpressionVirtual>(mapping, parentName);
        _parent.values[_parent.index] = {
            property: _child
        };
    }

    children.splice(index, 1);
}
