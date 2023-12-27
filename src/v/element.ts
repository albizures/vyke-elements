export type VykeElementType = 'html' | 'svg' | 'fragment'

export type AnyVykeElement = VykeElement<string, unknown, VykeElementType>
export type VykeChild = AnyVykeElement | number | string | undefined

export class VykeElement<TName, TElement, TType extends VykeElementType> {
	/**
	 * use only to infer the output type
	 * check InferOutput for more details
	 * @private
	 */
	_output?: TElement = undefined
	props?: Partial<TElement> = undefined

	constructor(
		public name: TName,
		public type: TType,
		public children: Array<VykeChild> = [],
	) {}
}

export type InferOutput<TElement> = TElement extends { _output?: infer TOutput } ? TOutput : never
export type InferName<TElement> = TElement extends { name: infer TName } ? TName : never
