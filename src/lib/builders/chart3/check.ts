import { createChart } from './create.js';
import type { Readable } from 'svelte/store';
import type { DomainContinuous, DomainDiscrete, DomainDiscreteSet } from './types-basic.js';
import { scalerFactoryBand, scalerFactoryLinear } from './scale.js';
import { h_range } from './cardinal.js';
import type { InferStoreInner } from './types-util.js';

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
		dimensions: {
			x: {
				discrete: true,
				accessor: 'year',
				//domain: undefined as unknown as DomainDiscrete<string, typeof meta>,
				scalerFactory: scalerFactoryBand<string>
				//scalerFactory: undefined as any
			},
			y: {
				accessor: 'apples',
				range: h_range,
				scalerFactory: scalerFactoryLinear<number>
				//...h_continuous
			}
		}
	});

	type HasX = Assert<Contains<typeof result.dimensions, 'x'>, true>;
	type HasY = Assert<Contains<typeof result.dimensions, 'y'>, true>;
	type HasZ = Assert<Contains<typeof result.dimensions, 'z'>, false>;
	type HasR = Assert<Contains<typeof result.dimensions, 'r'>, false>;

	type HasMeta = Assert<IsEqual<typeof result.meta, Readable<typeof meta>>, true>

	type XOrdinal = Assert<IsEqual<typeof result.dimensions.x.discrete, true>, true>;
	type XAccessorInput = Assert<IsEqual<Parameters<InferStoreInner<typeof result.dimensions.x.accessor_d>>, [Row, { meta: typeof meta }]>, true>;
	type XAccessorReturn = Assert<IsEqual<ReturnType<InferStoreInner<typeof result.dimensions.x.accessor_d>>, string>, true>;
	type XDomain = Assert<IsEqual<InferStoreInner<typeof result.dimensions.x.domain>, DomainDiscrete<string, typeof meta> | undefined>, true>
	type XDomainD = Assert<IsEqual<InferStoreInner<typeof result.dimensions.x.domain_d>, DomainDiscreteSet<string>>, true>

	type YOrdinal = Assert<IsEqual<typeof result.dimensions.y.discrete, false | undefined>, true>;
	type YAccessorInput = Assert<IsEqual<Parameters<InferStoreInner<typeof result.dimensions.y.accessor_d>>, [Row, { meta: typeof meta }]>, true>;
	type YAccessorReturn = Assert<IsEqual<ReturnType<InferStoreInner<typeof result.dimensions.y.accessor_d>>, number>, true>;
	type YDomain = Assert<IsEqual<InferStoreInner<typeof result.dimensions.y.domain>, DomainContinuous<number, typeof meta> | undefined>, true>

	type HasDefaultXScaler = Assert<Contains<InferStoreInner<typeof result.dimensions.x.scaler_d>, 'bandwidth'>, true>;
	type HasDefaultYScaler = Assert<Contains<InferStoreInner<typeof result.dimensions.y.scaler_d>, 'interpolate'>, true>;
}
