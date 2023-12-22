import { ATTRS_PLACEHOLDER, addAttributes } from './attributes'
import { create } from './create'
import { CHILDREN_PLACEHOLDER, server$appendChildren } from './children'
import type { ElementString } from './elements'

type HtmlTags = HTMLElementTagNameMap
type HtmlTag = keyof HtmlTags

export type HtmlChild = string | undefined
export type HtmlConfig = {
	[TName in HtmlTag]: {
		output: ElementString<TName>
		props: HtmlTags[TName]
	}
}

function buildElement<TName extends HtmlTag>(name: TName): HtmlConfig[TName]['output'] {
	return `<${name} ${ATTRS_PLACEHOLDER}>${CHILDREN_PLACEHOLDER}</${name}>` as ElementString<TName>
}

export const createHtmlElement = create<HtmlConfig, HtmlChild>(
	buildElement,
	addAttributes,
	server$appendChildren,
)
