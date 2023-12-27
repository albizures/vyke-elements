import { type BuildFn, create } from '../create'
import type { VykeElement } from './element'
import type { FragmentElement } from './fragment'

export type SvgTags = SVGElementTagNameMap
export type SvgTag = keyof SvgTags

export type AnySvgProps = SvgTags[keyof SvgTags]
export type AnySvgElement = VykeElement<SvgTag, AnySvgProps, 'svg'>
export type SvgChild = FragmentElement | AnySvgElement | number | string | undefined
export type SvgConfig = {
	[TName in SvgTag]: {
		output: VykeElement<TName, SvgTags[TName], 'svg'>
		props: SvgTags[TName]
	}
}

function buildElement<TName extends SvgTag>(name: TName): VykeElement<TName, SvgTags[TName], 'svg'> {
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
