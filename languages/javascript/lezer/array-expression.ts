import {
    JSingleExpressionValue,
    JSingleExpressionValueVirtual,
    JSingleExpressionVirtual
} from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JOperator, JOperatorVirtual } from './operator';
import { JSpread, JSpreadVirtual } from './spread';
import { JPropertyVirtual } from './property';
/** $ _import $ **/

export interface JArrayExpression {
    type: 'ArrayExpression';
    values: JSingleExpressionValue[];
    commas: JOperator[],
    start: JOperator;
    end: JOperator;
    spreads: JSpread[];
    /** $ childType $ **/
}

export interface JArrayExpressionVirtual {
    type: 'ArrayExpression';
    values?: JSingleExpressionValueVirtual[];
    commas?: JOperatorVirtual[];
    start?: JOperatorVirtual;
    end?: JOperatorVirtual;
    spreads?: JSpreadVirtual[];
    /** $ childVirtualType $ **/
}

export function _JArrayExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, 'ArrayExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    if (parentName === 'ArrayExpression') {
        const [_parent] = getContextWithJNodeMapping<JArrayExpressionVirtual>(mapping, parentName);
        _parent.values?.push(child);
    }
    if (parentName === 'Property') {
        const [_parent] = getContextWithJNodeMapping<JPropertyVirtual>(mapping, parentName);
        _parent.value.value = child;
    }
    children.splice(index, 1);
}
