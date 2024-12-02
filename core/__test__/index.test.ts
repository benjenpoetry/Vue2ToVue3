import {
    describe,
    test,
    expect
} from 'vitest';
import { doVue2Vue3 } from '../src';
import { resolve } from 'path';
import { genTestFileContents } from '@vv/utils';

const vue2Path = resolve(__dirname, 'vue2.t');
const vue3Path = resolve(__dirname, 'vue3.t');
const [
    vue2
] = genTestFileContents(vue2Path);
const [
    vue3
] = genTestFileContents(vue3Path);

function prefix (code: string) {
    const codes = code.split('\n');

    const _codes: string[] = [];
    for (let i = 0; i < codes.length; i++) {
        const code = codes[i].replace(/\r/g, '');
        if (i === codes.length - 1 && !code) {
            continue;
        }
        _codes.push(code);
    }

    return _codes.join('\n');
}

describe('Script', () => {
    test('s', () => {
        const value = prefix(doVue2Vue3(vue2));
        expect(value).toBe(prefix(vue3));
    });
});
