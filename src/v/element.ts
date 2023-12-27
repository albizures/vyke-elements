export type VykeElementType = 'html' | 'svg' | 'fragment'

export type AnyVykeElement = VykeElement<string, unknown, VykeElementType>
export type VykeChild = AnyVykeElement | number | string | undefined

export type VykeElement<TName, TElement, TType extends VykeElementType> = {
	name: TName
	/**
	 * use only to infer the output type
	 * check InferOutput for more details
	 * @private
	 */
	_output?: TElement
	props?: Partial<TElement>
	type: TType
	children: Array<VykeChild>
}

export type InferOutput<TElement> = TElement extends { _output?: infer TOutput } ? TOutput : never
export type InferName<TElement> = TElement extends { name: infer TName } ? TName : never
