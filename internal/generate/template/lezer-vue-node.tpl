import { <%= prefix %><%= parentPascalCaseName %>Virtual } from './<%= parentName %>';
import {
    getContextWith<%= prefix %>NodeMapping,
    <%= prefix %>AstTypeKey,
    <%= prefix %>NodeMapping
} from './utils';
/** $ _import $ **/

export interface <%= prefix %><%= pascalCaseName %> {
    type: '<%= pascalCaseName %>';<%= eat %>
    /** $ childType $ **/
}

export interface <%= prefix %><%= pascalCaseName %>Virtual {
    type: '<%= pascalCaseName %>';<%= eatVirtual %>
    /** $ childVirtualType $ **/
}

export function _<%= prefix %><%= pascalCaseName %> (
    mapping: <%= prefix %>NodeMapping,
    parentName: <%= prefix %>AstTypeKey<%= params %>
) {
    const [child, index, children] = getContextWith<%= prefix %>NodeMapping<<%= prefix %><%= pascalCaseName %>Virtual>(mapping, '<%= pascalCaseName %>');<%= childValue %>
    children.splice(index, 1);<%= callback %>

    if (parentName === '<%= parentPascalCaseName %>') {
        const [_parent] = getContextWith<%= prefix %>NodeMapping<<%= prefix %><%= parentPascalCaseName %>Virtual>(mapping, parentName);
        <%= pending %>;
    }
}
