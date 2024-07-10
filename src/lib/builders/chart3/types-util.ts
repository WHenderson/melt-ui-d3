import type { Readable } from 'svelte/store';

export type MaybeStore<TYPE> = TYPE | Readable<TYPE>;
export type MaybeStores<TYPE> = { [k in keyof TYPE] : MaybeStore<TYPE[k]> }
export type StringValue = { toString(): string };