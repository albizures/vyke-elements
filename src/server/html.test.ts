import { expect, expectTypeOf, it } from 'vitest'
import { createProxy } from '../create.js'
import type { ElementString } from '../elements.js'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html.js'

const { div, a, span, p } = createProxy<HtmlConfig, HtmlChild>(createHtmlElement)

declare module '../attributes.js' {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface CustomAttributes {
		[Name: `x-${string}`]: any
	}
}

it('should support data/custom attributes', () => {
	const result = div({
		'data-test': '123',
		'x-test': '123',
	})

	expect(result).toContain('data-test="123"')
	expect(result).toContain('x-test="123"')
})

it('should return the correct type', () => {
	expectTypeOf(a()).toMatchTypeOf<ElementString<'a'>>()
	expectTypeOf(span()).toMatchTypeOf<ElementString<'span'>>()
	expectTypeOf(p()).toMatchTypeOf<ElementString<'p'>>()
})
