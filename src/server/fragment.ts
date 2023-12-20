import type { HtmlChild } from './html.js'

export function Fragment(...children: Array<HtmlChild>) {
	return children.join('')
}
