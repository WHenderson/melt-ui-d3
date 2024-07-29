import { type Readable, writable } from 'svelte/store';
import type { MaybeStore, StoreOrType } from './types-util.js';
import type { Accessor } from './types-basic.js';

export function isStore<TYPE>(maybeStore: TYPE | Readable<TYPE>): maybeStore is Readable<TYPE> {
	return maybeStore && typeof maybeStore === 'object' && 'subscribe' in maybeStore;
}

export function makeStore<TYPE>(maybeStore: TYPE | Readable<TYPE>): Readable<TYPE> {
	if (isStore(maybeStore)) {
		return maybeStore;
	} else {
		return writable(maybeStore);
	}
}

export function tuple<T extends any[]>(...args: T): T {
	return args;
}

