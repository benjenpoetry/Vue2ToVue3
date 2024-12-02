module.exports = {
    overrides: [
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser'
            },
            rules: {
                'no-undef': 'off',
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': 'off'
            }
        }
    ],
    extends: [
        'plugin:vue/vue3-recommended',
        './typescript'
    ],
    rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/no-v-html': 'off',
        'vue/require-prop-types': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-self-closing': 'off',
        'vue/no-lone-template': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/html-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                attribute: 1
            }
        ]
    }
};
