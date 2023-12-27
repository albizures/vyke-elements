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
	type AnyHtmlElement,
	createHtmlElement,
} from './html'
export {
	type SvgChild,
	type SvgConfig,
	type AnySvgElement,
	createSvgElement,
} from './svg'
