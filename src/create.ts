import type { CustomAttributes } from './attributes'

export type BuildFn<TName, TOutput> = (name: TName) => TOutput
export type MutateFn<TOutput, TProps> = (item: TOutput, props?: Partial<TProps>) => TOutput
export type AppendFn<TOutput, TChild> = (item: TOutput, children: Array<TChild>) => TOutput

const protoOf = Object.getPrototypeOf
const rootProto = protoOf({})

export type PropsLike = Record<string, any>

export type CreateConfigItem<TOutput, TProps> = { output: TOutput, props: TProps }
export type CreateConfigMap<
	TNames extends string | number | symbol,
	TOutput,
	TProps,
> = Record<
	TNames,
	CreateConfigItem<TOutput, TProps>
>

export function create<
	TConfigMap extends CreateConfigMap<any, any, any>,
	TChild,
	TCustomProps extends PropsLike = Record<string, never>,
>(
	build: BuildFn<keyof TConfigMap, TConfigMap[keyof TConfigMap]['output']>,
	mutate: MutateFn<TConfigMap[keyof TConfigMap]['output'], TConfigMap[keyof TConfigMap]['props']>,
	append: AppendFn<TConfigMap[keyof TConfigMap]['output'], TChild>,
) {
	return <TName extends keyof TConfigMap>(
		name: TName,
		props?: Partial<TConfigMap[TName]['props'] | TCustomProps | CustomAttributes> | TChild,
		...children: Array<TChild>
	): TConfigMap[TName]['output'] => {
		let result = build(name)
		if (props && protoOf(props) === rootProto) {
			result = mutate(result, props as Partial<TConfigMap[keyof TConfigMap]['props']>)
			result = append(result, children)
		}
		else {
			result = append(result, [props as TChild, ...children])
		}

		return result
	}
}

export type Factory<TName, TOutput, TChild> = (
	name: TName,
	props?: Partial<TOutput | PropsLike | CustomAttributes> | TChild,
	...children: Array<TChild>
) => TOutput

export type ProxyFactory<TOutput, TProps, TChild> = (
	props?: Partial<TProps | PropsLike | CustomAttributes> | TChild,
	...children: Array<TChild>
) => TOutput

export function createProxy<
	TConfigMap extends CreateConfigMap<any, any, any>,
	TChild,
>(fn: Factory<
		keyof TConfigMap,
		TConfigMap[keyof TConfigMap]['output'],
		TChild
	>,
) {
	return new Proxy({}, {
		get(target, property: any) {
			return (props: any, ...args: Array<any>) => fn(property, props, ...args)
		},
	}) as unknown as {
		[TName in keyof TConfigMap]: ProxyFactory<TConfigMap[TName]['output'], TConfigMap[TName]['props'], TChild>
	}
}
