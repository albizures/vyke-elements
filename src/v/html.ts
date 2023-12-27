import { type BuildFn, create } from '../create'
import type { FragmentElement } from './fragment'
import type { AnySvgElement } from './svg'

export type HtmlTags = HTMLElementTagNameMap
export type HtmlTag = keyof HtmlTags

export type Element<TName extends HtmlTag, TOutput> = {
	name: TName
	props?: Partial<TOutput>
	type: 'html'
	_output?: TOutput
	children: Array<HtmlChild>
}

export type AnyProps = HTMLElementTagNameMap[keyof HtmlTags]

export type AnyHtmlElement = Element<HtmlTag, AnyProps>
export type HtmlChild = FragmentElement | AnyHtmlElement | AnySvgElement | string | undefined
export type HtmlConfig = {
	[TName in HtmlTag]: {
		output: Element<TName, HtmlTags[TName]>
		props: HtmlTags[TName]
	}
}

function buildElement<TName extends HtmlTag>(name: TName): Element<TName, HtmlTags[TName]> {
	return {
		name,
		type: 'html',
		children: [],
	}
}

export function mutateElement<TElement extends AnyHtmlElement>(element: TElement, props?: Partial<TElement['props']>): TElement {
	if (props) {
		element.props = props
	}

	return element
}

export function appendChildren<
	TElement extends AnyHtmlElement,
	TChild extends HtmlChild,
>(element: TElement, children: Array<TChild>) {
	element.children = children

	return element
}

export type BuildElement = BuildFn<HtmlTag, HtmlConfig[keyof HtmlConfig]['output']>

export const createHtmlElement = create<HtmlConfig, HtmlChild>(
	buildElement as BuildElement,
	mutateElement,
	appendChildren,
)
