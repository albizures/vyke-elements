import type { ElementString } from './elements'

export const CHILDREN_PLACEHOLDER = '<!children!>' as const

export function insertChildren<TName extends string>(
	element: ElementString<TName>,
	children: Array<string | undefined>,
): ElementString<TName> {
	return element.replace(CHILDREN_PLACEHOLDER, children.join('')) as ElementString<TName>
}
