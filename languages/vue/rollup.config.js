import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: './parser/parser.js',
    output: [{
        format: 'cjs',
        file: './parser/vue.grammar.cjs'
    }, {
        format: 'es',
        file: './parser/vue.grammar.js'
    }],
    external (id) {
        if (id.startsWith('@lezer')) {
            return true;
        }
        return false;
    },
    plugins: [
        nodeResolve()
    ]
};
