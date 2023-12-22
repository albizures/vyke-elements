import { ATTRS_PLACEHOLDER, addAttributes } from './attributes'
import { create } from './create'
import { CHILDREN_PLACEHOLDER, server$appendChildren } from './children'
import type { ElementString } from './elements'

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
