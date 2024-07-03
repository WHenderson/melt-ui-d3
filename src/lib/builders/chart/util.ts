import { type Readable, writable } from 'svelte/store';
import type { AccessorOutput, ExtentsInput, ExtentsInputOrdinal, ExtentsOutputScalar } from './types.js';

export function constant<TYPE>(value: TYPE): Readable<TYPE>{
	return {
		subscribe: (run: (value: TYPE) => void) => {
			run(value);
			return () => { /* do nothing */
			}
		}
	}
}

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

export function createFinderOrdinal<DOMAINTYPE>() {
	const found = new Set<DOMAINTYPE>();
	const check = (value: DOMAINTYPE) => { found.add(value) };
	return { found, check }
}

export function createFinderMin<DOMAINTYPE>(max: DOMAINTYPE) {
	const found: [null | DOMAINTYPE, null | DOMAINTYPE] = [null, max];
	const check = (value: DOMAINTYPE) => {
		if (value !== null && value !== undefined) {
			if (found[0] === null || value < (found[0] as any))
				found[0] = value;
		}
	};
	return { found, check }
}

export function createFinderMax<DOMAINTYPE>(min: DOMAINTYPE) {
	const found: [null | DOMAINTYPE, null | DOMAINTYPE] = [min, null];
	const check = (value: DOMAINTYPE) => {
		if (value !== null && value !== undefined) {
			if (found[1] === null || value > (found[1] as any))
				found[1] = value;
		}
	};
	return { found, check }
}

export function createFinderMinMax<DOMAINTYPE>() {
	const found: [null | DOMAINTYPE, null | DOMAINTYPE] = [null, null];
	const check = (value: DOMAINTYPE) => {
		if (value !== null && value !== undefined) {
			if (found[0] === null || value < (found[0] as any))
				found[0] = value;
			if (found[1] === null || value > (found[1] as any))
				found[1] = value;
		}
	};
	return { found, check }
}

export function createFinder<DOMAINTYPE>(ordinal: boolean, extents: ExtentsInput<DOMAINTYPE> | undefined) {
	if (ordinal) {
		if (Array.isArray(extents))
			return { found: new Set<DOMAINTYPE>(extents as ExtentsInputOrdinal<DOMAINTYPE>), check: undefined };
		else
			return createFinderOrdinal<DOMAINTYPE>();
	}
	else {
		if (!extents)
			return createFinderMinMax<DOMAINTYPE>();

		const [min, max] = extents;
		if (min !== null) {
			if (max !== null) {
				const found: ExtentsOutputScalar<DOMAINTYPE> = [ min, max ];
				return { found, check: undefined }
			}
			else
				return createFinderMax<DOMAINTYPE>(min);
		}
		else  {
			if (max !== null)
				return createFinderMin<DOMAINTYPE>(max);
			else
				return createFinderMinMax<DOMAINTYPE>();
		}
	}
}

export function createFinderAccessor<ROW, DOMAINTYPE>(ordinal: boolean, accessor: AccessorOutput<ROW, DOMAINTYPE> | undefined, extents: ExtentsInput<DOMAINTYPE> | undefined) {
	if (!accessor)
		return undefined;

	const { found, check } = createFinder(ordinal, extents);

	return {
		found,
		check: !check
			? undefined
			: (row: ROW) => {
				const value = accessor(row);
				if (Array.isArray(value))
					value.forEach(value => check(value));
				else
					check(value);
			}
	}
}