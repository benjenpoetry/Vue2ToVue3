import { VStyleElement } from '../../lezer';
import _ from 'lodash';
import { genOpenString } from './open';
import { genCloseString } from './close';

const template = '<%= open %><%= value %><%= close %>';

export function genStyleString (ast: VStyleElement) {
    const { open, close, value } = ast;
    const compiled = _.template(template);
    const result = compiled({
        open: genOpenString(open),
        value: value.value,
        close: genCloseString(close)
    });
    return result;
}
