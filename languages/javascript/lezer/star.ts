import { JYieldExpressionVirtual } from './yield-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JFunctionExpressionVirtual } from './function-expression';
import { Range } from 'vscode-languageserver-protocol';
/** $ _import $ **/

export interface JStar {
    type: 'Star';
    value: string;
    range: Range;
    /** $ childType $ **/
}

export interface JStarVirtual {
    type: 'Star';
    value?: string;
    range?: Range;
    /** $ childVirtualType $ **/
}

export function _JStar (
    mapping: JNodeMapping,
    parentName: JAstTypeKey,
    value: string,
    range: Range,
    callback: () => void
) {
    const [child, index, children] = getContextWithJNodeMapping<JStarVirtual>(mapping, 'Star');
    child.value = value;
    child.range = range;
    if (parentName === 'YieldExpression') {
        const [_parent] = getContextWithJNodeMapping<JYieldExpressionVirtual>(mapping, parentName);
        _parent.star = child;
    }
    if (parentName === 'FunctionExpression') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent.star = child;
    }
    children.splice(index, 1);
    callback();
}
