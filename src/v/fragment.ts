import type { HtmlChild } from './html'

export type FragmentElement = {
	name: 'FRAGMENT'
	_output?: DocumentFragment
	props?: DocumentFragment
	type: 'fragment'
	children: Array<HtmlChild>
}

export function Fragment(...children: Array<HtmlChild>): FragmentElement {
	return {
		children,
		type: 'fragment',
		name: 'FRAGMENT',
	}
}
