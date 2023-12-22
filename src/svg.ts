import { ATTRS_PLACEHOLDER, addAttributes } from './attributes.js'
import { create } from './create.js'
import { CHILDREN_PLACEHOLDER, server$appendChildren } from './children.js'
import type { ElementString } from './elements.js'

type SvgTags = SVGElementTagNameMap
type SvgTag = keyof SvgTags

export type SvgChild = string | undefined
export type SvgConfig = {
	[TName in SvgTag]: {
		output: ElementString<TName>
		props: SvgTags[TName]
	}
}

function buildElement<TName extends SvgTag>(name: TName): SvgConfig[TName]['output'] {
	return `<${name} ${ATTRS_PLACEHOLDER}>${CHILDREN_PLACEHOLDER}</${name}>` as ElementString<TName>
}

export const createSvgElement = create<SvgConfig, SvgChild>(
	buildElement,
	addAttributes,
	server$appendChildren,
)
