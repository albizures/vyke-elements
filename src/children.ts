import type { ElementString } from './elements.js'

export const CHILDREN_PLACEHOLDER = '<!children!>' as const

export function server$appendChildren<TName extends string>(
	element: ElementString<TName>,
	children: Array<string | undefined>,
): ElementString<TName> {
	return element.replace(CHILDREN_PLACEHOLDER, children.join('')) as ElementString<TName>
}

export function dom$appendChildren<
	TElement extends ParentNode,
	TChild extends Node | string | undefined,
>(element: TElement, children: Array<TChild>) {
	for (const child of children) {
		child && element.append(child)
	}

	return element
}
