import { JString } from '../../../lezer';

export function genStringString (
    ast: JString
) {
    return ast.value;
}
