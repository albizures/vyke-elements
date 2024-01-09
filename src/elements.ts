export type ElementString<TName extends string> = TName extends any
	? `<${TName} ${string}>${string}</${TName}>`
	: never
