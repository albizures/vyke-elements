// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { type HtmlChild, type HtmlConfig, createHtmlElement, createProxy } from './index.js'

const { a, p } = createProxy<HtmlConfig, HtmlChild>(createHtmlElement)

it('should return a dom element', () => {
	const result = p({ class: 'test' }, a('google'))
	expect(result).toBeInstanceOf(Element)
})
