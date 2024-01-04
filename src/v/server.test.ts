import { expect, it } from 'vitest'
import { createProxy } from '../create'
import { $ } from './server'
import { type HtmlChild, type HtmlConfig, createHtmlElement } from './html'

const { a, p } = createProxy<HtmlConfig, HtmlChild>(createHtmlElement)

it('should return a string element', () => {
	const result = $(p({ class: 'test' }, a('google')))
	expect(result).toBe('<p class="test"><a>google</a></p>')
})
