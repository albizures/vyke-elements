import { applyAttributes } from './attributes'

export type ElementString<TName extends string> = TName extends any ? `<${TName} ${string}>${string}</${TName}>` : never

export function mutateElement<TElement extends Element>(element: TElement, props?: Partial<TElement>): TElement {
	if (props) {
		applyAttributes(element, props)
	}

	return element
}
