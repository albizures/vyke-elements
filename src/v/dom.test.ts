// @vitest-environment jsdom
import { expect, expectTypeOf, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { createProxy } from '../create'
import { $ } from './dom'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html'

expect.extend(matchers as any)

const { a, span, p } = createProxy<HtmlConfig, HtmlChild>(createHtmlElement)

it('should create elements', () => {
	const link = $(a({ href: 'google.com' }, 'link to google'))

	expect(link).toHaveAttribute('href', 'google.com')
	expect(link).toHaveTextContent('link to google')

	const paragraph = $(p({ 'data-value': '1' },
		'content ',
		span({ class: 'font-bold' }, 'foo')),
	)

	expect(paragraph).toHaveAttribute('data-value', '1')
	expect(paragraph).toHaveTextContent('content foo')
	expect(paragraph.querySelector('span')).toHaveAttribute('class', 'font-bold')
})

it('should return the correct type', () => {
	expectTypeOf($(a())).toMatchTypeOf<HTMLAnchorElement>()
	expectTypeOf($(span())).toMatchTypeOf<HTMLSpanElement>()
	expectTypeOf($(p())).toMatchTypeOf<HTMLSpanElement>()
})
