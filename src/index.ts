import { createProxy } from './create'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html'
import { type SvgChild, type SvgConfig, createSvgElement } from './svg'

export const elements = {
	html: createProxy<HtmlConfig, HtmlChild>(createHtmlElement),
	svg: createProxy<SvgConfig, SvgChild>(createSvgElement),
}

export {
	type CreateConfigItem,
	type CreateConfigMap,
	type ProxyFactory,
	type Factory,
	type BuildFn,
	type MutateFn,
	type AppendFn,
	create,
	createProxy,
} from './create'

export { Fragment, type FragmentElement } from './fragment'

export {
	type HtmlChild,
	type HtmlConfig,
	type HtmlTag,
	type HtmlTags,
	type AnyHtmlElement,
	type HtmlBuildElement,
	createHtmlElement,
} from './html'
export {
	type SvgChild,
	type SvgConfig,
	type SvgTag,
	type SvgTags,
	type AnySvgProps,
	type AnySvgElement,
	type SvgBuildElement,
	createSvgElement,
} from './svg'

export {
	type DataAttributes,
	type CustomAttributes,
	type Setter,
} from './attributes'

export {
	VykeElement,
	type VykeElementType,
	type AnyVykeElement,
	type VykeChild,
	type InferOutput,
	type InferName,
} from './element'

export {
	type VykeRefElement,
	type AnyVykeRefElement,
	type OnCreatedHandle,
	type InferFactoryOutput,
	type ConvertToRef,
	ref,
} from './ref'

export { type ElementString } from './elements'
