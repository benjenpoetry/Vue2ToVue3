import { JExportDeclaration, JExportDeclarationVirtual } from './export-declaration';
import { JReturnStatement, JReturnStatementVirtual } from './return-statement';
/** $ _import $ **/

export type Statement = JExportDeclaration
| JReturnStatement

export type StatementVirtual = JExportDeclarationVirtual
| JReturnStatementVirtual

export interface JScript {
    type: 'Script';
    values: Statement[];
    /** $ childType $ **/
}

export interface JScriptVirtual {
    type: 'Script';
    values: StatementVirtual[]
    /** $ childVirtualType $ **/
}
