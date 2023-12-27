import { createProxy } from '../create'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html'
import { type SvgChild, type SvgConfig, createSvgElement } from './svg'

export { Fragment, type FragmentElement } from './fragment'

export const elements = {
	html: createProxy<HtmlConfig, HtmlChild>(createHtmlElement),
	svg: createProxy<SvgConfig, SvgChild>(createSvgElement),
}

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
	type CreateConfigItem,
	type CreateConfigMap,
	type ProxyFactory,
	type Factory,
	type BuildFn,
	type MutateFn,
	type AppendFn,
	type PropsLike,
} from '../create'

export {
	type DataAttributes,
	type CustomAttributes,
	type Setter,
} from '../attributes'

export { type ElementString } from '../elements'
