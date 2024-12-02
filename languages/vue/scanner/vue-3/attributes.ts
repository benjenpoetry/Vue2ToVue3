import { VAttribute } from '../../lezer';
import _ from 'lodash';

const template = '<%= name %><%= is %><%= value %>';

export function genVAttributesString (
    ast: VAttribute
) {
    const compiled = _.template(template);
    const result = compiled({
        name: ast.attributeName.value,
        is: ast.is?.value,
        value: ast.attributeValue?.value
    });
    return result;
}
