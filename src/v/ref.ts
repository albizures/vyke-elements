import type { AnyVykeElement, VykeElement, VykeElementType } from './element'

const IS_REF = Symbol('is-ref')

export type VykeRefElement<TName, TElement, TType extends VykeElementType> = VykeElement<TName, TElement, TType> & {
	[IS_REF]: true
	value: TElement
	onCreated: (handle: OnCreatedHandle<TElement>) => void
}

export type AnyVykeRefElement = VykeRefElement<string, unknown, VykeElementType>
export type OnCreatedHandle<TElement> = (element: TElement) => void
export function ref<
	TName,
	TElement,
	TType extends VykeElementType,
>(element: VykeElement<TName, TElement, TType>): VykeRefElement<TName, TElement, TType> {
	let value: TElement
	let onCreatedHandle: OnCreatedHandle<TElement>

	function onCreated(handle: OnCreatedHandle<TElement>) {
		onCreatedHandle = handle
	}

	return new Proxy(element, {
		get(target, p, receiver) {
			if (IS_REF === p) {
				return true
			}

			if (p === 'value') {
				if (!value) {
					throw new Error('use of ref value before being available')
				}

				return value
			}

			if (p === 'onCreated') {
				return onCreated
			}

			return Reflect.get(target, p, receiver)
		},

		set(target, p, newValue, receiver) {
			if (p === 'value') {
				value = newValue
				onCreatedHandle && onCreatedHandle(value)
			}

			return Reflect.set(target, p, newValue, receiver)
		},
	}) as VykeRefElement<TName, TElement, TType>
}

export function isRef(element: AnyVykeElement): element is AnyVykeRefElement {
	return element[IS_REF]
}
