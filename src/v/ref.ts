import type { AnyVykeElement, VykeElement, VykeElementType } from './element'

const IS_REF = Symbol('is-ref')

export type VykeRefElement<TName, TElement, TType extends VykeElementType> = VykeElement<TName, TElement, TType> & {
	[IS_REF]: true
	asProp: boolean
	value: TElement
	onCreated: (handle: OnCreatedHandle<TElement>) => void
}

type InferFactoryOutput<TFactory> = TFactory extends () => infer TElement ? TElement : never
type ConvertToRef<TElement> = TElement extends { name: infer TName, _output?: infer TOuput, type: infer TType }
	? TType extends VykeElementType
		? VykeRefElement<TName, TOuput, TType>
		: never
	: never

export type AnyVykeRefElement = VykeRefElement<string, unknown, VykeElementType>
export type OnCreatedHandle<TElement> = (element: TElement) => void
export function ref<
	TFactory extends () => AnyVykeElement,
>(): ConvertToRef<InferFactoryOutput<TFactory>>
export function ref<
	TName,
	TElement,
	TType extends VykeElementType,
>(element: VykeElement<TName, TElement, TType>): VykeRefElement<TName, TElement, TType>
export function ref<
	TName,
	TElement,
	TType extends VykeElementType,
>(element?: VykeElement<TName, TElement, TType>): VykeRefElement<TName, TElement, TType> {
	let value: TElement
	let onCreatedHandle: OnCreatedHandle<TElement>
	const asProp = !element

	function onCreated(handle: OnCreatedHandle<TElement>) {
		onCreatedHandle = handle
	}

	return new Proxy(element ?? {}, {
		get(target, p, receiver) {
			if (IS_REF === p) {
				return true
			}

			if (p === 'asProp') {
				return asProp
			}

			if (p === 'value') {
				if (!value) {
					const asPropMessage = asProp ? 'Did you set it as prop?' : ''
					throw new Error(`use of ref value before being available.${asPropMessage}`)
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

export function isRef(element: unknown): element is AnyVykeRefElement {
	return typeof element === 'object' && element !== null && (element as any)[IS_REF]
}
