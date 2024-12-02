import { JAstType } from '@vv/javascript';
import { VContent } from './content';
import { VDocument } from './document';
import { VElement } from './element';
import { VNodeReference } from './entity-reference';
import { VText } from './text';
import { VOpenTag } from './open-tag';
import { VStartTag } from './start-tag';
import { VTagName } from './tag-name';
import { VEndTag } from './end-tag';
import { VAttribute } from './attribute';
import { VAttributeName } from './attribute-name';
import { VIs } from './is';
import { VAttributeValue } from './attribute-value';
import { VInterpolation } from './interpolation';
import { VSingleExpression } from './javascript';
import { VOperator } from './operator';
import { VCloseTag } from './close-tag';
import { VStartCloseTag } from './start-close-tag';
import { VStyleText } from './style-text';
/** $ _import $ **/

export type VAstType =
JAstType
| VOperator
| VContent
| VDocument
| VElement
| VNodeReference
| VText
| VOpenTag
| VStartTag
| VTagName
| VEndTag
| VAttribute
| VAttributeName
| VIs
| VAttributeValue
| VInterpolation
| VSingleExpression
| VCloseTag
| VStartCloseTag
| VStyleText
/** $ type $ **/
