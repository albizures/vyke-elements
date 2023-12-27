import { type BuildFn, create } from '../create'
import type { FragmentElement } from './fragment'

export type SvgTags = SVGElementTagNameMap
export type SvgTag = keyof SvgTags

export type SvgElement<TName extends SvgTag, TOuput> = {
	name: TName
	_output?: TOuput
	type: 'svg'
	props?: Partial<TOuput>
	children: Array<SvgChild>
}

export type AnySvgProps = SVGElementTagNameMap[keyof SvgTags]

export type AnySvgElement = SvgElement<SvgTag, AnySvgProps>
export type SvgChild = FragmentElement | AnySvgElement | string | undefined
export type SvgConfig = {
	[TName in SvgTag]: {
		output: SvgElement<TName, SvgTags[TName]>
		props: SvgTags[TName]
	}
}

function buildElement<TName extends SvgTag>(name: TName): SvgElement<TName, SvgTags[TName]> {
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

export type SvgBuildElement = BuildFn<SvgTag, SvgConfig[keyof SvgConfig]['output']>

export const createSvgElement = create<SvgConfig, SvgChild>(
	buildElement as SvgBuildElement,
	mutateElement,
	appendChildren,
)
