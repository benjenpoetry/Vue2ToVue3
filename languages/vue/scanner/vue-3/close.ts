import { VCloseTag } from '../../lezer';

export function genCloseString (ast: VCloseTag) {
    return ast.startCloseTag.value + ast.tagName.value + ast.endTag.value;
}
