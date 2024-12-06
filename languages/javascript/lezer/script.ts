import { JExportDeclaration, JExportDeclarationVirtual } from './export-declaration';
import { JReturnStatement, JReturnStatementVirtual } from './return-statement';
import { JImportDeclaration, JImportDeclarationVirtual } from './import-declaration';
/** $ _import $ **/

export type Statement = JExportDeclaration
| JReturnStatement
| JImportDeclaration

export type StatementVirtual = JExportDeclarationVirtual
| JReturnStatementVirtual
| JImportDeclarationVirtual

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
