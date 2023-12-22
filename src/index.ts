import { Fragment as DomFragment } from './dom/fragment'
import { Fragment as ServerFragment } from './fragment'
import {
	type HtmlChild as DomHtmlChild,
	type HtmlConfig as DomHtmlConfig,
	createHtmlElement as createDomHtmlElement,
} from './dom/html'
import {
	type HtmlChild as ServerHtmlChild,
	type HtmlConfig as ServerHtmlConfig,
	createHtmlElement as createServerHtmlElement,
} from './html'
import {
	type SvgChild as DomSvgChild,
	type SvgConfig as DomSvgConfig,
	createSvgElement as createDomSvgElement,
} from './dom/svg'
import {
	type SvgChild as ServerSvgChild,
	type SvgConfig as ServerSvgConfig,
	createSvgElement as createServerSvgElement,
} from './svg'
import type { Factory } from './create'

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

export type HtmlChild = DomHtmlChild | ServerHtmlChild
export type HtmlConfig = DomHtmlConfig | ServerHtmlConfig
export type CreateHtmlElement = Factory<
	keyof HtmlConfig,
	HtmlConfig[keyof HtmlConfig]['output'],
	HtmlChild
>
export const createHtmlElement = (typeof window === 'undefined' ? createServerHtmlElement : createDomHtmlElement) as CreateHtmlElement

export type SvgChild = DomSvgChild | ServerSvgChild
export type SvgConfig = DomSvgConfig | ServerSvgConfig
export type CreateSvgElement = Factory<
	keyof SvgConfig,
	SvgConfig[keyof SvgConfig]['output'],
	SvgChild
>
export const createSvgElement = (typeof window === 'undefined' ? createServerSvgElement : createDomSvgElement) as CreateSvgElement

export const Fragment = typeof window === 'undefined' ? ServerFragment : DomFragment
