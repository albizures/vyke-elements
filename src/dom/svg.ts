import { dom$appendChildren } from '../children.js'
import { create } from '../create.js'
import { mutateElement } from '../elements.js'

type SvgTags = SVGElementTagNameMap
type SvgTag = keyof SvgTags

export type SvgChild = Node | string | undefined
export type SvgConfig = {
	[TName in SvgTag]: {
		output: SvgTags[TName]
		props: SvgTags[TName]
	}
}

function buildElement<TName extends SvgTag>(name: TName): SvgTags[TName] {
	return document.createElementNS('http://www.w3.org/2000/svg', name)
}

export const createSvgElement = create<SvgConfig, SvgChild>(
	buildElement,
	mutateElement,
	dom$appendChildren,
)
