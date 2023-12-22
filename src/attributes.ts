import type { ElementString } from './elements'

type DataAttributes = Record<`data-${string}`, any>

// eslint-disable-next-line ts/consistent-type-definitions
export interface CustomAttributes extends DataAttributes {
	class: string
}

export const ATTRS_PLACEHOLDER = '<!attr!>' as const

export function getAttributeName(raw: string) {
	const name = raw.toLowerCase()

	if (name.startsWith('aria')) {
		return name.replace('aria', 'aria-')
	}

	return name
}

function getAttribute(name: string, value: unknown) {
	// TODO satinize values here
	return `${getAttributeName(name)}="${value}"`
}

function buildAttributes(values: Record<string, unknown>) {
	let attrs = ''

	for (const [key, value] of Object.entries(values)) {
		attrs = `${attrs} ${getAttribute(key, value)}`
	}

	return attrs.trim()
}

export function addAttributes<TName extends string>(
	element: ElementString<TName>,
	props?: Record<string, unknown>,
): ElementString<TName> {
	let attrs = ''
	if (props) {
		attrs = buildAttributes(props)
	}

	return element.replace(ATTRS_PLACEHOLDER, attrs) as ElementString<TName>
}

type Setter = (value: any) => void
const propSetterCache: Record<string, Setter | undefined> = {}

function applyAttribute(element: Element, propName: string, value: unknown) {
	const cacheKey = `${element.tagName},${propName}`

	if (!propSetterCache[cacheKey]) {
		propSetterCache[cacheKey] = getPropDescriptor(element, propName)?.set
	}

	const propSetter = propSetterCache[cacheKey]

	const setter: (value: any) => void = propSetter
		? propSetter.bind(element)
		: element.setAttribute.bind(element, propName)

	setter(value)
}

function getPropDescriptor(
	object: unknown,
	key: string,
): PropertyDescriptor | undefined {
	let current = object
	while (current) {
		const descriptor = Object.getOwnPropertyDescriptor(current, key)

		if (descriptor) {
			return descriptor
		}

		current = Object.getPrototypeOf(current)
	}
}

export function applyAttributes<TElement extends Element>(element: TElement, props: Partial<TElement>) {
	for (const [key, value] of Object.entries(props)) {
		applyAttribute(element, key, value)
	}
}
