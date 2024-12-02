module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        './basic'
    ],
    rules: {
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-undef': 'off',
        'no-return-assign': 'off',
        camelcase: 'off',
        'promise/param-names': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
};
