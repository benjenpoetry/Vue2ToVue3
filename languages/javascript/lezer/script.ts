import { JExportDeclaration, JExportDeclarationVirtual } from './export-declaration';
import { JReturnStatement, JReturnStatementVirtual } from './return-statement';
import { JImportDeclaration, JImportDeclarationVirtual } from './import-declaration';
import { JExpressionStatement, JExpressionStatementVirtual } from './expression-statement';
/** $ _import $ **/

export type Statement = JExportDeclaration
| JReturnStatement
| JImportDeclaration
| JExpressionStatement

export type StatementVirtual = JExportDeclarationVirtual
| JReturnStatementVirtual
| JImportDeclarationVirtual
| JExpressionStatementVirtual

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
