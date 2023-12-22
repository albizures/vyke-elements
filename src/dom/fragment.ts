import type { HtmlChild } from './html'

export function Fragment(...children: Array<HtmlChild>) {
	const frament = document.createDocumentFragment()

	for (const child of children) {
		child && frament.append(child)
	}

	return frament
}
