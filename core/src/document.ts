import { genStyleString, genVNodeElementString, VDocument, VNodeElement, VScriptElement, VStyleElement } from '@vv/vue';
import { _Vue, _VueData, genVueScript } from '@vv/javascript';
import _ from 'lodash';

const TPL_VUE = '<%= template %>\n\n<%= script %>\n\n<%= style %>';
const TPL_VUE_SCRIPT = '<script setup>\n<%= _import %>\n<%= _data %>\n</script>';
const TPL_VUE_IMPORT = 'import { <%= value %> } from \'vue\';';
const TPL_VUE_DATA = 'const <%= name %> = ref(<%= value %>);';

export function doScanDocument (
    ast: VDocument,
    vue: _Vue
) {
    const values = ast.values;

    const scripts: VScriptElement[] = [];
    const nodes: VNodeElement[] = [];
    const styles: VStyleElement[] = [];

    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value.type === 'Content') {
            continue;
        }
        const element = value.value;
        if (element.type === 'NodeElement') {
            nodes.push(element);
            continue;
        }
        if (element.type === 'ScriptElement') {
            scripts.push(element);
            continue;
        }
        styles.push(element);
    }

    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        genVueScript(script.value, vue);
    }

    const templateStrings: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        templateStrings.push(genVNodeElementString(node));
    }

    const styleStrings: string[] = [];
    for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        styleStrings.push(genStyleString(style));
    }

    const template = templateStrings.join('');
    const style = styleStrings.join('\n');
    /**
     * - 拼接 template
     * - 拼接 setup
     * - 拼接 imports
     * - 拼接 data
     * - 拼接 methods
     * - 拼接 style
     * **/
    const script = genScriptString(vue);
    const compiled = _.template(TPL_VUE);
    const result = compiled({
        template,
        script,
        style
    });
    return result;
}

function genScriptString (vue: _Vue) {
    const { data, imports } = vue;
    const _import = genVueImportString(imports);
    const _data = genVueDataString(data);
    const compiled = _.template(TPL_VUE_SCRIPT);
    const result = compiled({
        _import,
        _data
    });
    return result;
}

function genVueImportString (imports: string[]) {
    const compiled = _.template(TPL_VUE_IMPORT);
    const value = imports.join(', ');
    const result = compiled({
        value
    });
    return result;
}

function genVueDataString (data: _VueData[]) {
    const compiled = _.template(TPL_VUE_DATA);
    const results: string[] = [];
    for (let i = 0; i < data.length; i++) {
        const result = compiled({
            name: data[i].name,
            value: data[i].value
        });
        results.push(result);
    }
    return results.join('\n');
}
