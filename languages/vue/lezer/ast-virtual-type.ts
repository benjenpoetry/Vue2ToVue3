import { VContentVirtual } from './content';
import { VDocumentVirtual } from './document';
import { VElementVirtual } from './element';
import { VNodeReferenceVirtual } from './entity-reference';
import { VTextVirtual } from './text';
import { VOpenTagVirtual } from './open-tag';
import { VStartTagVirtual } from './start-tag';
import { VTagNameVirtual } from './tag-name';
import { VEndTagVirtual } from './end-tag';
import { VAttributeVirtual } from './attribute';
import { VAttributeNameVirtual } from './attribute-name';
import { VIsVirtual } from './is';
import { VAttributeValueVirtual } from './attribute-value';
import { VInterpolationVirtual } from './interpolation';
import { JAstVirtualType } from '@vv/javascript';
import { VOperatorVirtual } from './operator';
import { VCloseTagVirtual } from './close-tag';
import { VStartCloseTagVirtual } from './start-close-tag';
import { VStyleTextVirtual } from './style-text';
/** $ _import $ **/

export type VAstVirtualType =
JAstVirtualType
| VOperatorVirtual
| VContentVirtual
| VDocumentVirtual
| VElementVirtual
| VNodeReferenceVirtual
| VTextVirtual
| VOpenTagVirtual
| VStartTagVirtual
| VTagNameVirtual
| VEndTagVirtual
| VAttributeVirtual
| VAttributeNameVirtual
| VIsVirtual
| VAttributeValueVirtual
| VInterpolationVirtual
| VCloseTagVirtual
| VStartCloseTagVirtual
| VStyleTextVirtual
/** $ type $ **/
