import { _Vue } from '@vv/javascript';
import { genVueAst } from '@vv/vue';
import { doScanDocument } from './document';

/**
 * doVue2Vue3 将 Vue 写法转换成 Vu3
 * @param source vue2 code
 * @return vue3 code
 *
 * - Global variable
 *  - results: the generated code arrays
 *  - variables
 * - Convert the code into an AST
 * - Analyze Javascript code
 * - 分析 template
 * - 组装 vue3 代码
 * **/
export function doVue2Vue3 (
    source: string
): string {
    const ast = genVueAst(source);
    const result = doScanDocument(ast, genVue());
    return result;
}

function genVue (): _Vue {
    return {
        data: [],
        methods: [],
        imports: []
    };
}
