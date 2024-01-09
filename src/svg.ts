import { type BuildFn, create } from './create'
import { VykeElement } from './element'
import type { FragmentElement } from './fragment'
import type { VykeRefElement } from './ref'

export type SvgTags = SVGElementTagNameMap
export type SvgTag = keyof SvgTags

export type AnySvgProps = SvgTags[keyof SvgTags]
export type AnySvgElement = VykeElement<SvgTag, AnySvgProps, 'svg'>
export type SvgChild = FragmentElement | AnySvgElement | number | string | undefined
export type SvgConfig = {
	[TName in SvgTag]: {
		output: VykeElement<TName, SvgTags[TName], 'svg'>
		props: SvgTags[TName] & {
			$ref: VykeRefElement<TName, SvgTags[TName], 'svg'>
		}
	}
}

function buildElement<TName extends SvgTag>(name: TName): VykeElement<TName, SvgTags[TName], 'svg'> {
	return new VykeElement(name, 'svg')
}

function mutateElement<TElement extends AnySvgElement>(element: TElement, props?: Partial<TElement['props']>): TElement {
	if (props) {
		element.props = props
	}

	return element
}

function appendChildren<
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
