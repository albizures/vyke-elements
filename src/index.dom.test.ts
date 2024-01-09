// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { $ } from './dom'
import { elements } from './index'

const { a, p } = elements.html

it('should return a dom element', () => {
	const result = $(p({ class: 'test' }, a('google')))
	expect(result).toBeInstanceOf(Element)
})
