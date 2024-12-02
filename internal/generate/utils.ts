import {
    existsSync,
    readdirSync,
    readFileSync,
    writeFileSync
} from 'fs-extra';
import path from 'path';

import prompts, { PromptObject } from 'prompts';
import _ from 'lodash';
import { InternalRoot } from '../utils';

export function doCheckNodeName (name: string) {
    return !/^[a-z][a-z|-]*[a-z]$/.test(name);
}

const BASE_FILE_AST_TYPE = 'ast-type';
const BASE_FILE_AST_VIRTUAL_TYPE = 'ast-virtual-type';
const BASE_FILE_INDEX = 'index';
const BASE_FILE_UTILS = 'utils';
const BASE_FILE_KEYWORD = 'keyword';
const BASE_FILE_OPERATOR = 'operator';

const FLAG_IMPORT = '/** $ _import $ **/';
const FLAG_TYPE = '/** $ type $ **/';
const FLAG_GEN_VIRTUAL_NODE = '/** $ genVirtualNode $ **/';
const FLAG_GEN_AST = '/** $ genAst $ **/';
const FLAG_CHILD_TYPE = '/** $ childType $ **/';
const FLAG_CHILD_VIRTUAL_TYPE = '/** $ childVirtualType $ **/';
const FLAG_INDEX = '/** $ _export $ **/';
const FLAG_KEY_VAR = '/** $ kVar $ **/';
const FLAG_KEY_FUN = '/** $ kFun $ **/';

export function doCheckNodeExist (
    root: string,
    name: string,
    suffix: string
) {
    return existsSync(path.resolve(root, `${name}.${suffix}`));
}

export function genNodeChoices (root: string): prompts.Choice[] {
    const files = readdirSync(root, { withFileTypes: true });
    const baseFileNames = [
        BASE_FILE_AST_TYPE,
        BASE_FILE_AST_VIRTUAL_TYPE,
        BASE_FILE_INDEX,
        BASE_FILE_UTILS,
        BASE_FILE_KEYWORD,
        BASE_FILE_OPERATOR
    ].map(it => `${it}.ts`);

    const choices: prompts.Choice[] = [];
    for (const file of files) {
        if (file.isDirectory()) {
            continue;
        }
        /**
         * Filter files that are not .ts
         * **/
        if (!file.name.endsWith('.ts')) {
            continue;
        }

        /**
         * Filter the base files
         * **/
        if (baseFileNames.some(it => it === file.name)) {
            continue;
        }

        const parentNode = file.name.substring(0, file.name.length - 3);
        choices.push({
            title: parentNode,
            value: parentNode
        });
    }
    return choices;
}

function doSpawnNode (
    root: string,
    name: string,
    parent: string,
    isValueAppend: boolean,
    eat: boolean,
    prefix: string
) {
    const tplPath = path.resolve(InternalRoot, 'generate', 'template', 'lezer-vue-node.tpl');
    let data = readFileSync(tplPath, 'utf-8');

    // Compiler the template
    const compiled = _.template(data);
    data = compiled({
        prefix,
        pascalCaseName: _.upperFirst(_.camelCase(name)),
        parentName: parent,
        parentPascalCaseName: _.upperFirst(_.camelCase(parent)),
        pending: isValueAppend
            ? `_parent.${_.camelCase(name)} = child`
            : `_parent.${_.camelCase(name)}s?.push(child)`,
        eat: eat
            ? `\n${genTab(1)}value: string`
            : '',
        eatVirtual: eat
            ? `\n${genTab(1)}value?: string`
            : '',
        params: eat
            ? `,\n${genTab(1)}value: string,\n${genTab(1)}callback: () => void`
            : '',
        callback: eat
            ? `\n${genTab(1)}callback();`
            : '',
        childValue: eat
            ? `\n${genTab(1)}child.value = value;`
            : ''
    });

    /**
     * Enter the template, generate the file
     * **/
    const filename = name + '.ts';
    writeFileSync(path.resolve(root, filename), data);
}

const INTERPOLATE = /\/\*\*\s\$\s([\s\S]+?)\$\s\*\*\//g;

function doUpdateAstType (name: string, root: string, prefix: string) {
    const sourcePath = path.resolve(root, BASE_FILE_AST_TYPE + '.ts');

    let data = readFileSync(sourcePath, 'utf-8');
    const compiled = _.template(data);
    data = compiled({
        _import: `import { ${prefix}${_.upperFirst(_.camelCase(name))} } from './${name}';\n${FLAG_IMPORT}`,
        type: `| ${prefix}${_.upperFirst(_.camelCase(name))}\n${FLAG_TYPE}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateAstVirtualType (name: string, root: string, prefix: string) {
    const sourcePath = path.resolve(root, BASE_FILE_AST_VIRTUAL_TYPE + '.ts');

    let data = readFileSync(sourcePath, 'utf-8');
    const compiled = _.template(data);
    data = compiled({
        _import: `import { ${prefix}${_.upperFirst(_.camelCase(name))}Virtual } from './${name}';\n${FLAG_IMPORT}`,
        type: `| ${prefix}${_.upperFirst(_.camelCase(name))}Virtual\n${FLAG_TYPE}`
    });

    writeFileSync(sourcePath, data);
}

function genTab (tab: number) {
    return new Array(tab * 4).fill(' ').join('');
}

function doUpdateUtils (name: string, eat: boolean, root: string, prefix: string) {
    const sourcePath = path.resolve(root, BASE_FILE_UTILS + '.ts');

    const _name = _.upperFirst(_.camelCase(name));
    let data = readFileSync(sourcePath, 'utf-8');
    const compiled = _.template(data);
    data = compiled({
        _import: `import { _${prefix}${_name} } from './${name}';\n${FLAG_IMPORT}`,
        genVirtualNode: `case '${_name}':\n${genTab(2)}return { type: '${_name}' };\n${genTab(1)}${FLAG_GEN_VIRTUAL_NODE}`,
        genAst: `case '${_name}':\n${genTab(2)}return _${prefix}${_name}${
            eat
                ? '(mapping, parentName, value, callback)'
                : '(mapping, parentName)'
        };\n${genTab(1)}${FLAG_GEN_AST}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateParent (
    name: string,
    parent: string,
    isValueAppend: boolean,
    necessary: boolean,
    root: string,
    prefix: string
) {
    const sourcePath = path.resolve(root, parent + '.ts');

    const camelCaseName = _.camelCase(name);
    const upperFirstCamelCaseName = _.upperFirst(camelCaseName);
    let data = readFileSync(sourcePath, 'utf-8');
    const compiled = _.template(data);

    data = compiled({
        _import: `import { ${prefix}${upperFirstCamelCaseName}, ${prefix}${upperFirstCamelCaseName}Virtual } from './${name}';\n${FLAG_IMPORT}`,
        childType: `${camelCaseName}${isValueAppend ? '' : 's'}${necessary ? ':' : '?:'} ${prefix}${upperFirstCamelCaseName};\n${genTab(1)}${FLAG_CHILD_TYPE}`,
        childVirtualType: `${camelCaseName}${isValueAppend ? '' : 's'}?: ${prefix}${upperFirstCamelCaseName}Virtual;\n${genTab(1)}${FLAG_CHILD_VIRTUAL_TYPE}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateIndex (name: string, root: string) {
    const sourcePath = path.resolve(root, BASE_FILE_INDEX + '.ts');

    let data = readFileSync(sourcePath, 'utf-8');
    const compiled = _.template(data);
    data = compiled({
        _export: `export * from './${name}';\n${FLAG_INDEX}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateKeyword (
    name: string,
    parent: string,
    root: string,
    prefix: string
) {
    const sourcePath = path.resolve(root, BASE_FILE_KEYWORD + '.ts');

    const camelCaseName = _.camelCase(name);

    const camelCaseParentName = _.camelCase(parent);
    const upperFirstCamelCaseParentName = _.upperFirst(camelCaseParentName);

    const _importTpl = `import { ${prefix}${upperFirstCamelCaseParentName}Virtual } from './${parent}';`;
    let _import = false;

    let data = readFileSync(sourcePath, 'utf-8');

    if (data.includes(_importTpl)) {
        _import = true;
    }

    const compiled = _.template(data);
    data = compiled({
        _import: _import ? FLAG_IMPORT : `${_importTpl}\n${FLAG_IMPORT}`,
        kVar: `'${camelCaseName}',\n${genTab(1)}${FLAG_KEY_VAR}`,
        kFun: `if (parentName === '${
            upperFirstCamelCaseParentName
        }' && value === '${camelCaseName}') {\n${genTab(2)}const [_parent] = getContextWith${prefix}NodeMapping<${prefix}${
            upperFirstCamelCaseParentName
        }Virtual>(mapping, parentName);\n${genTab(2)}_parent._${camelCaseName} = child;\n${genTab(1)}}\n${genTab(1)}${FLAG_KEY_FUN}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateKeywordParent (name: string, parent: string, root: string, prefix: string, necessary: boolean) {
    const sourcePath = path.resolve(root, parent + '.ts');

    const camelCaseName = _.camelCase(name);

    let data = readFileSync(sourcePath, 'utf-8');
    let _import = false;
    const importTemplate = `import { ${prefix}Keyword, ${prefix}KeywordVirtual } from './keyword';`;
    if (data.includes(importTemplate)) {
        _import = true;
    }
    const compiled = _.template(data);
    data = compiled({
        _import: _import ? FLAG_IMPORT : `${importTemplate}\n${FLAG_IMPORT}`,
        childType: `_${camelCaseName}${necessary ? ':' : '?:'} ${prefix}Keyword;\n${genTab(1)}${FLAG_CHILD_TYPE}`,
        childVirtualType: `_${camelCaseName}?: ${prefix}KeywordVirtual;\n${genTab(1)}${FLAG_CHILD_VIRTUAL_TYPE}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateOperator (
    name: string,
    parent: string,
    root: string,
    prefix: string
) {
    const sourcePath = path.resolve(root, BASE_FILE_OPERATOR + '.ts');

    const camelCaseParentName = _.camelCase(parent);
    const upperFirstCamelCaseParentName = _.upperFirst(camelCaseParentName);

    const _importTpl = `import { ${prefix}${upperFirstCamelCaseParentName}Virtual } from './${parent}';`;
    let _import = false;

    let data = readFileSync(sourcePath, 'utf-8');

    if (data.includes(_importTpl)) {
        _import = true;
    }

    const compiled = _.template(data);
    data = compiled({
        _import: _import ? FLAG_IMPORT : `${_importTpl}\n${FLAG_IMPORT}`,
        kVar: `'${name}',\n${genTab(1)}${FLAG_KEY_VAR}`,
        kFun: `if (parentName === '${
            upperFirstCamelCaseParentName
        }' && value === '${name}') {\n${genTab(2)}const [_parent] = getContextWith${prefix}NodeMapping<${prefix}${
            upperFirstCamelCaseParentName
        }Virtual>(mapping, parentName);\n${genTab(2)}_parent['${name}'] = child;\n${genTab(1)}}\n${genTab(1)}${FLAG_KEY_FUN}`
    });

    writeFileSync(sourcePath, data);
}

function doUpdateOperatorParent (name: string, parent: string, root: string, prefix: string, necessary: boolean) {
    const sourcePath = path.resolve(root, parent + '.ts');

    let data = readFileSync(sourcePath, 'utf-8');
    let _import = false;
    const importTemplate = `import { ${prefix}Operator, ${prefix}OperatorVirtual } from './operator';`;
    if (data.includes(importTemplate)) {
        _import = true;
    }
    const compiled = _.template(data);
    data = compiled({
        _import: _import ? FLAG_IMPORT : `${importTemplate}\n${FLAG_IMPORT}`,
        childType: `['${name}']${necessary ? ':' : '?:'} ${prefix}Operator;\n${genTab(1)}${FLAG_CHILD_TYPE}`,
        childVirtualType: `['${name}']?: ${prefix}OperatorVirtual;\n${genTab(1)}${FLAG_CHILD_VIRTUAL_TYPE}`
    });

    writeFileSync(sourcePath, data);
}

type Question = 'name'
| 'keyword'
| 'operator'
| 'parent'
| 'append'
| 'necessary'
| 'eat'

export async function start (root: string, prefix: string) {
    let cancel = false;
    let keyword = false;
    let operator = false;
    const questions: PromptObject<Question>[] = [
        {
            type: 'confirm',
            name: 'operator',
            message: 'Is the node is operator'
        },
        {
            type: 'text',
            name: 'name',
            message: 'Please enter the node name',
            validate (name: string) {
                if (operator) {
                    return true;
                }
                if (doCheckNodeName(name)) {
                    return 'Please use the (kebab case) naming convention for node names';
                }
                if (doCheckNodeExist(root, name, 'ts')) {
                    return `A node named ${name} already exists in the node library!`;
                }
                return true;
            }
        },
        {
            type () {
                return 'select';
            },
            name: 'parent',
            message: 'Please select the node parent name',
            choices: genNodeChoices(root)
        },
        {
            type () {
                return 'confirm';
            },
            name: 'necessary',
            message: 'Is this node necessary on the parent node',
            initial: false
        },
        {
            type () {
                if (operator) {
                    return null;
                }
                return 'confirm';
            },
            name: 'keyword',
            message: 'Is the node is keyword'
        },
        {
            type () {
                if (keyword) {
                    return null;
                }
                if (operator) {
                    return null;
                }
                return 'confirm';
            },
            name: 'append',
            message: 'Is value append way',
            initial: true
        },
        {
            type () {
                if (keyword) {
                    return null;
                }
                if (operator) {
                    return null;
                }
                return 'confirm';
            },
            name: 'eat',
            message: 'Is the node eat label?',
            initial: false
        }
    ];
    const result = await prompts(questions, {
        onCancel () {
            cancel = true;
        },
        onSubmit (prompt, answer) {
            if (prompt.name === 'keyword' && answer) {
                keyword = true;
            }
            if (prompt.name === 'operator' && answer) {
                operator = true;
            }
        }
    });

    if (cancel) {
        return false;
    }

    if (result.keyword) {
        _.templateSettings.interpolate = INTERPOLATE;
        doUpdateKeyword(result.name, result.parent, root, prefix);
        doUpdateKeywordParent(result.name, result.parent, root, prefix, result.necessary);
        return true;
    }

    if (result.operator) {
        _.templateSettings.interpolate = INTERPOLATE;
        doUpdateOperator(result.name, result.parent, root, prefix);
        doUpdateOperatorParent(result.name, result.parent, root, prefix, result.necessary);
        return true;
    }

    if (!result.name || !result.parent) {
        return false;
    }

    doSpawnNode(root, result.name, result.parent, result.append, result.eat, prefix);

    _.templateSettings.interpolate = INTERPOLATE;
    doUpdateAstType(result.name, root, prefix);
    doUpdateAstVirtualType(result.name, root, prefix);
    doUpdateUtils(result.name, result.eat, root, prefix);
    doUpdateParent(result.name, result.parent, result.append, result.necessary, root, prefix);
    doUpdateIndex(result.name, root);
}
