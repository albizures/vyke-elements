import { dom$appendChildren } from '../children.js'
import { create } from '../create.js'
import { mutateElement } from '../elements.js'

type HtmlTags = HTMLElementTagNameMap
type HtmlTag = keyof HtmlTags

export type HtmlChild = Node | string | undefined
export type HtmlConfig = {
	[TName in HtmlTag]: {
		output: HtmlTags[TName]
		props: HtmlTags[TName]
	}
}

function buildElement<TName extends HtmlTag>(name: TName): HtmlTags[TName] {
	return document.createElement(name)
}

export const createHtmlElement = create<HtmlConfig, HtmlChild>(
	buildElement,
	mutateElement,
	dom$appendChildren,
)
