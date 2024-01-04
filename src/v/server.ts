import { ATTRS_PLACEHOLDER, addAttributes } from '../attributes'
import { CHILDREN_PLACEHOLDER, server$appendChildren } from '../children'
import type { ElementString } from '../elements'
import type { AnyVykeElement, InferName } from './element'

export function $<
	TElement extends AnyVykeElement,
	TOutput extends ElementString<InferName<TElement>> = ElementString<InferName<TElement>>,
>(element: TElement): TOutput {
	const { children, props } = element
	let output = getOutput<TOutput>(element.name)

	if (isElementString(output)) {
		output = addAttributes(output, props) as TOutput

		output = server$appendChildren(output, children.map((child) => {
			if (typeof child === 'object') {
				return $(child)
			}
			return typeof child === 'undefined' ? '' : String(child)
		})) as TOutput
	}

	return output
}

function getOutput<TOutput>(name: string): TOutput {
	return `<${name} ${ATTRS_PLACEHOLDER}>${CHILDREN_PLACEHOLDER}</${name}>` as TOutput
}

function isElementString(item: unknown): item is ElementString<string> {
	return typeof item === 'string'
}
