import { type BuildFn, create } from './create'
import { VykeElement } from './element'
import type { FragmentElement } from './fragment'
import type { VykeRefElement } from './ref'
import type { AnySvgElement } from './svg'

export type HtmlTags = HTMLElementTagNameMap
export type HtmlTag = keyof HtmlTags

export type AnyProps = HtmlTags[keyof HtmlTags]
export type AnyHtmlElement = VykeElement<HtmlTag, AnyProps, 'html'>
export type HtmlChild = FragmentElement | AnyHtmlElement | AnySvgElement | string | number | undefined
export type HtmlConfig = {
	[TName in HtmlTag]: {
		output: VykeElement<TName, HtmlTags[TName], 'html'>
		props: HtmlTags[TName] & {
			$ref: VykeRefElement<TName, HtmlTags[TName], 'html'>
		}
	}
}

function buildElement<TName extends HtmlTag>(name: TName): VykeElement<TName, HtmlTags[TName], 'html'> {
	return new VykeElement(name, 'html')
}

function mutateElement<TElement extends AnyHtmlElement>(element: TElement, props?: Partial<TElement['props']>): TElement {
	if (props) {
		element.props = props
	}

	return element
}

function appendChildren<
	TElement extends AnyHtmlElement,
	TChild extends HtmlChild,
>(element: TElement, children: Array<TChild>) {
	element.children = children

	return element
}

export type HtmlBuildElement = BuildFn<HtmlTag, HtmlConfig[keyof HtmlConfig]['output']>

export const createHtmlElement = create<HtmlConfig, HtmlChild>(
	buildElement as HtmlBuildElement,
	mutateElement,
	appendChildren,
)
