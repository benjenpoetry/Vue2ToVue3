import { resolve } from 'path';

export const Root = resolve(__dirname, '..', '..');
export const LanguagesRoot = resolve(Root, 'languages');
export const VueRoot = resolve(LanguagesRoot, 'vue');
export const VueLezerRoot = resolve(VueRoot, 'lezer');

export const JsRoot = resolve(LanguagesRoot, 'javascript');
export const JsLezerRoot = resolve(JsRoot, 'lezer');

export const InternalRoot = resolve(Root, 'internal');
