// @vitest-environment jsdom
import { describe, expect, expectTypeOf, it, vi } from 'vitest'
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

it('should diffentiate props from child', () => {
	const paragraph = $(p(
		a({ href: 'google.com' }, 'link to google'),
		'content ',
		span({ class: 'font-bold' }, 'foo')),
	)

	expect(paragraph).toHaveTextContent('link to google')
	expect(paragraph).toHaveTextContent('content foo')
	expect(paragraph.querySelector('span')).toHaveAttribute('class', 'font-bold')
})

it('should return the correct type', () => {
	expectTypeOf($(a())).toMatchTypeOf<HTMLAnchorElement>()
	expectTypeOf($(span())).toMatchTypeOf<HTMLSpanElement>()
	expectTypeOf($(p())).toMatchTypeOf<HTMLSpanElement>()
})

describe('ref', () => {
	it('share the same element', () => {
		const text = $.ref(span({ class: 'font-bold' }, 'foo'))
		const paragraph = $(p({ 'data-value': '1' },
			'content ',
			text,
		))

		expect(paragraph).toHaveAttribute('data-value', '1')
		expect(paragraph).toHaveTextContent('content foo')
		expect(paragraph.querySelector('span')).toHaveAttribute('class', 'font-bold')
		expect(paragraph).toContainElement(text.value)
	})

	describe('as props', () => {
		it('share the same element', () => {
			const text = $.ref<typeof span>()
			const paragraph = $(p({ 'data-value': '1' },
				'content ',
				span({ class: 'font-bold', $ref: text }, 'foo'),
			))

			expect(paragraph).toHaveAttribute('data-value', '1')
			expect(paragraph).toHaveTextContent('content foo')
			expect(paragraph.querySelector('span')).toHaveAttribute('class', 'font-bold')
			expect(paragraph).toContainElement(text.value)
		})
	})

	describe('when used before being created', () => {
		it('should throw an error', () => {
			const text = $.ref(span({ class: 'font-bold' }, 'foo'))

			expect(() => text.value).toThrow()

			const element = $(text)

			expect(element).toBe(text.value)
		})
	})
	describe('on created event', () => {
		it('should call the on created handle', () => {
			const text = $.ref(span({ class: 'font-bold' }, 'foo'))

			const handle = vi.fn()

			text.onCreated(handle)

			expect(handle).not.toHaveBeenCalled()

			const element = $(text)

			expect(handle).toHaveBeenCalledOnce()
			expect(handle).toHaveBeenCalledWith(element)
		})
	})
})
