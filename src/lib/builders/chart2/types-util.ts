import type { Readable } from 'svelte/store';

export type OptionalStore<TYPE> = TYPE | Readable<TYPE>;
export type Map2OptionalStore<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : OptionalStore<TYPE[k]> }