import type { Readable } from 'svelte/store';
import type { AccessorFunc, DomainField } from './types-basic.js';

export type MaybeStore<TYPE> = TYPE | Readable<TYPE>;
export type MaybeStores<TYPE> = { [k in keyof TYPE] : k extends 'discrete' ? TYPE[k] : MaybeStore<TYPE[k]> }
export type Stores<TYPE> = { [k in keyof TYPE] : k extends 'discrete' ? TYPE[k] : Readable<TYPE[k]> }
export type StringValue = { toString(): string };

export type InferStoreInner<STORE> =
	STORE extends Readable<infer INNER>
		? INNER
		: never;

export type InferMaybeStoreInner<MAYBESTORE> =
	MAYBESTORE extends Readable<infer INNER>
		? INNER
		: MAYBESTORE;

export type ReplaceLeafType<TYPE, FROM, TO> =
	TYPE extends Array<infer ELEMENT>
	? Array<ReplaceLeafType<ELEMENT, FROM, TO>>
	: TYPE extends Record<string, infer MEMBER>
	? { [k in keyof TYPE]: ReplaceLeafType<TYPE[k], FROM, TO> }
	: TYPE extends FROM
	? TO
	: never;

export type InferAccessorReturn<ROW, META, ACCESSOR> =
	InferMaybeStoreInner<ACCESSOR> extends (row: ROW, info: { meta: META }) => infer R
		? R
		: InferMaybeStoreInner<ACCESSOR> extends keyof ROW
		? ROW[InferMaybeStoreInner<ACCESSOR>]
		: never
