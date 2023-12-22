// @vitest-environment jsdom
import { expect, expectTypeOf, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { createProxy } from '../create'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html'

expect.extend(matchers as any)

const { a, span, p } = createProxy<HtmlConfig, HtmlChild>(createHtmlElement)

it('should create elements', () => {
	const link = a({ href: 'google.com' }, 'link to google')

	expect(link).toHaveAttribute('href', 'google.com')
	expect(link).toHaveTextContent('link to google')

	const text = span({ class: 'font-bold' }, 'foo')
	const paragraph = p({ 'data-value': '1' }, 'content ', text)

	expect(paragraph).toHaveAttribute('data-value', '1')
	expect(paragraph).toHaveTextContent('content foo')
	expect(paragraph).toContainElement(text)
})

it('should return the correct type', () => {
	expectTypeOf(a()).toMatchTypeOf<HTMLAnchorElement>()
	expectTypeOf(span()).toMatchTypeOf<HTMLSpanElement>()
	expectTypeOf(p()).toMatchTypeOf<HTMLSpanElement>()
})
