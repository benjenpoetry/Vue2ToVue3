import { JSingleExpressionVirtual } from './single-expression';
import {
    getContextWithJNodeMapping,
    JAstTypeKey,
    JNodeMapping
} from './utils';
import { JKeyword, JKeywordVirtual } from './keyword';
import { JStar, JStarVirtual } from './star';
import { JVariableDefinition, JVariableDefinitionVirtual } from './variable-definition';
import { JParamList, JParamListVirtual } from './param-list';
import { JBlock, JBlockVirtual } from './block';
/** $ _import $ **/

export interface JFunctionExpression {
    type: 'FunctionExpression';
    _async?: JKeyword;
    _function: JKeyword;
    star?: JStar;
    variableDefinition?: JVariableDefinition;
    paramList: JParamList;
    block: JBlock;
    /** $ childType $ **/
}

export interface JFunctionExpressionVirtual {
    type: 'FunctionExpression';
    _async?: JKeywordVirtual;
    _function?: JKeywordVirtual;
    star?: JStarVirtual;
    variableDefinition?: JVariableDefinitionVirtual;
    paramList?: JParamListVirtual;
    block?: JBlockVirtual;
    /** $ childVirtualType $ **/
}

export function _JFunctionExpression (
    mapping: JNodeMapping,
    parentName: JAstTypeKey
) {
    const [child, index, children] = getContextWithJNodeMapping<JFunctionExpressionVirtual>(mapping, 'FunctionExpression');
    if (parentName === 'SingleExpression') {
        const [_parent] = getContextWithJNodeMapping<JSingleExpressionVirtual>(mapping, parentName);
        _parent.value = child;
    }
    children.splice(index, 1);
}
