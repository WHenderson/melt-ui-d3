import { createChart } from './create.js';
import type { DomainInputOrdinal, DomainInputScalar, DomainOutputOrdinal } from './types.js';
import type { Readable } from 'svelte/store';

type IsEqual<A,B> = [A] extends [B] ? true : false;
type Contains<C, M> = M extends keyof C ? true : false;
type Assert<C,V extends C> = V;

const ndata  = [
	{ year: '2016', apples: 10 },
	{ year: '2018', apples: 11 }
];

type Row = { year: string, apples: number };
const rdata: Row[] = ndata;

const meta = {
	myMeta: 'hello world'
}

{
	const result = createChart({
		data: rdata,
		meta: meta,
		width: 0,
		height: 0,
		x: {
			ordinal: true,
			accessor: 'year',
		},
		y: {
			accessor: 'apples'
		}
	});

	const d = result.x.domain;
	const dd = result.x.domain_d;
	const d2: typeof result.x.domain = ['x'];

	type HasX = Assert<Contains<typeof result, 'x'>, true>;
	type HasY = Assert<Contains<typeof result, 'y'>, true>;
	type HasZ = Assert<Contains<typeof result, 'z'>, false>;
	type HasR = Assert<Contains<typeof result, 'r'>, false>;

	type HasMeta = Assert<IsEqual<typeof result.meta, Readable<typeof meta>>, true>

	type XOrdinal = Assert<IsEqual<typeof result.x.ordinal, true>, true>;
	type XAccessorInput = Assert<IsEqual<Parameters<typeof result.x.accessor_d>, [Row]>, true>;
	type XAccessorReturn = Assert<IsEqual<ReturnType<typeof result.x.accessor_d>, string>, true>;
	type XDomain = Assert<IsEqual<typeof result.x.domain, DomainInputOrdinal<string> | undefined>, true>
	type XDomainD = Assert<IsEqual<typeof result.x.domain_d, DomainOutputOrdinal<string>>, true>

	type YOrdinal = Assert<IsEqual<typeof result.y.ordinal, false | undefined>, true>;
	type YAccessorInput = Assert<IsEqual<Parameters<typeof result.y.accessor_d>, [Row]>, true>;
	type YAccessorReturn = Assert<IsEqual<ReturnType<typeof result.y.accessor_d>, number>, true>;
	type YDomain = Assert<IsEqual<typeof result.y.domain, DomainInputScalar<number> | undefined>, true>

	type HasDefaultXScaler = Assert<Contains<typeof result.x.scaler_d, 'bandwidth'>, true>;
	type HasDefaultYScaler = Assert<Contains<typeof result.y.scaler_d, 'interpolate'>, true>;
}

// todo
// [y] Option for reversing range
// [x] make chartFactory dependencies keyed
// [y] Default scale types should be exposed in return
// [ ] Default scale types (in implementation)
// [y] add meta(data)