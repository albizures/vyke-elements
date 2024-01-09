import { expect, it } from 'vitest'
import { $ } from './server'
import { elements } from './index'

const { a, p } = elements.html

it('should return a string element', () => {
	const result = $(p({ class: 'test' }, a('google')))
	expect(typeof result).toBe('string')
})
