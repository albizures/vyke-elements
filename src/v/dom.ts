import { applyAttributes } from '../attributes'
import type { AnyVykeElement, InferOutput, VykeElementType } from './element'
import { isRef, ref } from './ref'

export function $<
	TElement extends AnyVykeElement,
	TOutput = InferOutput<TElement>,
>(element: TElement): TOutput {
	if (isRef(element) && element.asProp) {
		throw new Error('using prop ref as element')
	}

	const { children, props } = element
	const output = getOutput<TOutput>(element.name, element.type)

	let setRefValue: (() => void) | undefined

	if (props && output instanceof Element) {
		if ('$ref' in props) {
			const { $ref } = props
			delete props.$ref

			if (isRef($ref)) {
				setRefValue = () => {
					$ref.value = output
				}
			}
		}

		applyAttributes(output, props)
	}

	if (isParentNode(output)) {
		for (const elementChild of children) {
			if (typeof elementChild === 'undefined') {
				continue
			}
			else if (typeof elementChild === 'object') {
				const child = $(elementChild)
				output.append(child instanceof Node ? child : String(child))
			}
			else {
				output.append(String(elementChild))
			}
		}
	}

	if (isRef(element)) {
		element.value = output
	}

	if (setRefValue) {
		setRefValue()
	}

	return output
}

$.ref = ref

function getOutput<TOutput>(name: string, type: VykeElementType): TOutput {
	if (type === 'html') {
		return document.createElement(name) as unknown as TOutput
	}
	else if (type === 'svg') {
		return document.createElementNS('http://www.w3.org/2000/svg', name) as unknown as TOutput
	}

	return document.createDocumentFragment() as TOutput
}

function isParentNode(item: unknown): item is ParentNode {
	return item instanceof Node && 'append' in item
}
