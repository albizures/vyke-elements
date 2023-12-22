import type { HtmlChild } from './html'

export function Fragment(...children: Array<HtmlChild>) {
	return children.join('')
}
