import { VContent, VContentVirtual } from './content';
import { VElement, VElementVirtual } from './element';
/** $ _import $ **/

export type VDocumentValue = VElement
| VContent

export type VDocumentValueVirtual = VElementVirtual
| VContentVirtual

export interface VDocument {
    type: 'Document';
    values: VDocumentValue[];
    /** $ childType $ **/
}

export interface VDocumentVirtual {
    type: 'Document';
    values: VDocumentValueVirtual[];
    /** $ childVirtualType $ **/
}
