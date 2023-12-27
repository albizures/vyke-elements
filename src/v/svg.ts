import { type BuildFn, create } from '../create'
import type { FragmentElement } from './fragment'

export type SvgTags = SVGElementTagNameMap
export type SvgTag = keyof SvgTags

export type Element<TName extends SvgTag, TOuput> = {
	name: TName
	_output?: TOuput
	type: 'svg'
	props?: Partial<TOuput>
	children: Array<SvgChild>
}

export type AnyProps = SVGElementTagNameMap[keyof SvgTags]

export type AnySvgElement = Element<SvgTag, AnyProps>
export type SvgChild = FragmentElement | AnySvgElement | string | undefined
export type SvgConfig = {
	[TName in SvgTag]: {
		output: Element<TName, SvgTags[TName]>
		props: SvgTags[TName]
	}
}

function buildElement<TName extends SvgTag>(name: TName): Element<TName, SvgTags[TName]> {
	return {
		name,
		type: 'svg',
		children: [],
	}
}

export function mutateElement<TElement extends AnySvgElement>(element: TElement, props?: Partial<TElement['props']>): TElement {
	if (props) {
		element.props = props
	}

	return element
}

export function appendChildren<
	TElement extends AnySvgElement,
	TChild extends SvgChild,
>(element: TElement, children: Array<TChild>) {
	element.children = children

	return element
}

export type BuildElement = BuildFn<SvgTag, SvgConfig[keyof SvgConfig]['output']>

export const createSvgElement = create<SvgConfig, SvgChild>(
	buildElement as BuildElement,
	mutateElement,
	appendChildren,
)
