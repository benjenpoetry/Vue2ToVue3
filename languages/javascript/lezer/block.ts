import { JArrowFunctionVirtual } from './arrow-function';
import { JFunctionExpressionVirtual } from './function-expression';
import { JOperator, JOperatorVirtual } from './operator';
import { JPropertyVirtual } from './property';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { Statement, StatementVirtual } from './script';
/** $ _import $ **/

export interface JBlock {
    type: 'Block';
    start: JOperator;
    end: JOperator;
    values: Statement[];
    /** $ childType $ **/
}

export interface JBlockVirtual {
    type: 'Block';
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    values: StatementVirtual[]
    /** $ childVirtualType $ **/
}

export function _JBlock (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JBlockVirtual>(mapping, 'Block');
    if (parentName === 'Property') {
        const [_parent] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, parentName);
        _parent.value.block = child;
    }

    if (parentName === 'FunctionExpression') {
        const [_parent] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, parentName);
        _parent.block = child;
    }

    if (parentName === 'ArrowFunction') {
        const [_parent] = getContextWithJNodeMapping<JArrowFunctionVirtual>(mapping, parentName);
        _parent.value = child;
    }

    children.splice(index, 1);
}
