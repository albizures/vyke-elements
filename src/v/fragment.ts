import type { HtmlChild } from './html'
import { VykeElement } from './element'

export type FragmentElement = VykeElement<'FRAGMENT', DocumentFragment, 'fragment'>

export function Fragment(...children: Array<HtmlChild>): FragmentElement {
	return new VykeElement('FRAGMENT', 'fragment', children)
}
