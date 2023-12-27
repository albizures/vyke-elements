import { createProxy } from '../create'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html'
import { type SvgChild, type SvgConfig, createSvgElement } from './svg'

export { Fragment } from './fragment'

export const elements = {
	html: createProxy<HtmlConfig, HtmlChild>(createHtmlElement),
	svg: createProxy<SvgConfig, SvgChild>(createSvgElement),
}
