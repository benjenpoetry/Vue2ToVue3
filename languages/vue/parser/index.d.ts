import { LRLanguage, LanguageSupport } from '@codemirror/language';

declare const vueLanguage: LRLanguage;
declare function vue(config?: {
    base?: LanguageSupport;
}): LanguageSupport;

export { vue, vueLanguage };
