import { expect, it } from 'vitest'
import { ATTRS_PLACEHOLDER, addAttributes, getAttributeName } from './attributes'

it('should support aria attributes', () => {
	expect(getAttributeName('ariaLabel')).toBe('aria-label')
})

it('should add correctly the attributes', () => {
	const expected = `<test > ->test="foo" bar="123"<- </test>`
	const result = addAttributes(`<test > ->${ATTRS_PLACEHOLDER}<- </test>`, {
		test: 'foo',
		bar: '123',
	})

	expect(result).toBe(expected)
})
