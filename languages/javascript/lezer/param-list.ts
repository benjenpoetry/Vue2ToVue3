import { JPropertyVirtual } from './property';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JOperator, JOperatorVirtual } from './operator';
import { JFunctionExpressionVirtual } from './function-expression';
import { JArrowFunctionVirtual } from './arrow-function';
/** $ _import $ **/

export interface JParamList {
    type: 'ParamList';
    start: JOperator;
    end: JOperator;
    /** $ childType $ **/
}

export interface JParamListVirtual {
    type: 'ParamList';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    /** $ childVirtualType $ **/
}

export function _JParamList (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JParamListVirtual>(mapping, 'ParamList');
    if (parentName === 'Property') {
        const [_parent] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, parentName);
        _parent.value.paramList = child;
    }

    if (parentName === 'FunctionExpression') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent.paramList = child;
    }

    if (parentName === 'ArrowFunction') {
        const [_parent] = getContextWithJNodeMapping<JArrowFunctionVirtual>(mapping, parentName);
        _parent.paramList = child;
    }

    children.splice(index, 1);
}
