import { JScript } from '../../lezer';
import { genVueExportDefault } from './export-declaration';
import { _Vue } from './vue';

export function genVueScript (
    ast: JScript,
    vue: _Vue
) {
    const values = ast.values;
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value.type === 'ExportDeclaration') {
            genVueExportDefault(value, vue);
        }
    }
}
