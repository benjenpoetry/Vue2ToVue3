import { VOpenTag } from '../../lezer';
import { genVAttributesString } from './attributes';
import _ from 'lodash';

const template = '<%= startTag %><%= tagName %><%= attribute %><%= endTag %>';
export function genOpenString (
    ast: VOpenTag
) {
    const {
        startTag,
        endTag,
        tagName,
        attributes
    } = ast;

    const attributeStrings: string[] = [];
    for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        attributeStrings.push(genVAttributesString(attribute));
    }

    let attribute = '';
    if (attributeStrings.length) {
        attribute = ' ' + attributeStrings.join(' ');
    }

    const compiled = _.template(template);
    const result = compiled({
        startTag: startTag.value,
        tagName: tagName.value,
        attribute,
        endTag: endTag.value
    });

    return result;
}
