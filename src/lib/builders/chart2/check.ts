import { createChart } from './create.js';
import { ArgumentsType } from 'vitest';

type IsEqual<A,B> = [A] extends [B] ? true : false;
type Contains<C, M> = M extends keyof C ? true : false;
type Assert<C,V extends C> = V;

const ndata  = [
	{ year: '2016', apples: 10 },
	{ year: '2018', apples: 11 }
];

type Row = { year: string, apples: number };
const rdata: Row[] = ndata;

{
	const result = createChart({
		data: rdata,
		width: 0,
		height: 0,
		x: {
			ordinal: true,
			accessor: 'year'
		},
		y: {
			accessor: 'apples'
		}
	});

	type HasX = Assert<Contains<typeof result, 'x'>, true>;
	type HasY = Assert<Contains<typeof result, 'y'>, true>;
	type HasZ = Assert<Contains<typeof result, 'z'>, false>;
	type HasR = Assert<Contains<typeof result, 'r'>, false>;

	type XOrdinal = Assert<IsEqual<typeof result.x.ordinal, true>, true>;
	type XAccessorInput = Assert<IsEqual<ArgumentsType<typeof result.x.accessor_d>[0], Row>, true>;
	type XAccessorReturn = Assert<IsEqual<ReturnType<typeof result.x.accessor_d>, string>, true>;

	type YAccessorInput = Assert<IsEqual<ArgumentsType<typeof result.y.accessor_d>[0], Row>, true>;
	type YAccessorReturn = Assert<IsEqual<ReturnType<typeof result.y.accessor_d>, number>, true>;
	
	type HasDefaultXScaler = Assert<Contains<typeof result.x.scaler_d, 'bandwidth'>, true>;
	type HasDefaultYScaler = Assert<Contains<typeof result.y.scaler_d, 'interpolate'>, true>;
}