import { createChart, createChart2 } from './create.js';
import type {
	DomainInputOrdinal,
	DomainInputScalar,
	DomainOutputOrdinal,
	DomainOutputScalar,
	RangeOutput, Scaler, ScalerFactoryOrdinal,
} from './types.js';
import type { Readable } from 'svelte/store';
import { scaleFactoryBand, scaleFactoryLinear } from './scale.js';

type IsEqual<A,B> = [A] extends [B] ? true : false;
type Contains<C, M> = M extends keyof C ? true : false;
type Assert<C,V extends C> = V;
type InferContent<X extends Readable<unknown>> = X extends Readable<infer CONTENT> ? CONTENT : never;

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
	const result = createChart2({
		data: rdata,
		meta: meta,
		//width: 0,
		//height: 0,
		dimensions: {
			x: { // add additional creation functions that provide easier type inference?
				ordinal: true,
				accessor: 'year',
			},
			y: {
				accessor: 'apples'
			}, 
			xx: {
				ordinal: true,
				accessor: 'year',
				domain: ['a','b'],
				range: props => [0,1],
				//scalerFactory: scaleFactoryBand<string>
				//scalerFactory: <ScalerFactoryOrdinal<{   myMeta: string }, string, number, Scaler<string, number>>>scaleFactoryBand<string>
				//scalerFactory: props => <any>null!
			},
			//yy: {
			//	accessor: 'apples'
			//}
		}
	});

	type HasX = Assert<Contains<(typeof result)['dimensions'], 'x'>, true>;
	type HasY = Assert<Contains<(typeof result)['dimensions'], 'y'>, true>;
	type HasZ = Assert<Contains<(typeof result)['dimensions'], 'z'>, false>;
	type HasR = Assert<Contains<(typeof result)['dimensions'], 'r'>, false>;

	type HasMeta = Assert<IsEqual<typeof result.meta, Readable<typeof meta>>, true>;

	(() => {

		const {
			dims: {
				xx: {
					ordinal,
					accessor,
					domain,
					range,
					scalerFactory
				}
			}
		} = result;
	})();

	(() => {

		const {
			dimensions: {
				xx: {
					ordinal,
					o,
					accessor,
					range,
					reverse,
					sort,
					extents,
					extentDefault,
					domain,
					scalerFactory,
					accessor_d,
					range_d,
					scaler_d,
					scaled_d,
					extents_d,
					domain_d
				}
			}
		} = result;
	})();



	type XOrdinal = Assert<IsEqual<typeof result.dimensions.x.ordinal, true>, true>;
	type XAccessorInput = Assert<IsEqual<Parameters<InferContent<typeof result.dimensions.x.accessor_d>>, [Row]>, true>;
	type XAccessorReturn = Assert<IsEqual<ReturnType<InferContent<typeof result.dimensions.x.accessor_d>>, string>, true>;
	type XDomain = Assert<IsEqual<InferContent<typeof result.dimensions.x.domain>, DomainInputOrdinal<string> | undefined>, true>
	type XDomainD = Assert<IsEqual<InferContent<typeof result.dimensions.x.domain_d>, DomainOutputOrdinal<string>>, true>

	type YOrdinal = Assert<IsEqual<typeof result.dimensions.y.ordinal, false | undefined>, true>;
	type YAccessorInput = Assert<IsEqual<Parameters<InferContent<typeof result.dimensions.y.accessor_d>>, [Row]>, true>;
	type YAccessorReturn = Assert<IsEqual<ReturnType<InferContent<typeof result.dimensions.y.accessor_d>>, number>, true>;
	type YDomain = Assert<IsEqual<InferContent<typeof result.dimensions.y.domain>, DomainInputScalar<number> | undefined>, true>
	type YDomainD = Assert<IsEqual<InferContent<typeof result.dimensions.y.domain_d>, DomainOutputScalar<number>>, true>;

	type XXOrdinal = Assert<IsEqual<typeof result.dimensions.xx.ordinal, true>, true>;
	type XXAccessorInput = Assert<IsEqual<Parameters<InferContent<typeof result.dimensions.xx.accessor_d>>, [Row]>, true>;
	type XXAccessorReturn = Assert<IsEqual<ReturnType<InferContent<typeof result.dimensions.xx.accessor_d>>, string>, true>;
	type XXDomain = Assert<IsEqual<InferContent<typeof result.dimensions.xx.domain>, DomainInputOrdinal<string> | undefined>, true>
	type XXDomainD = Assert<IsEqual<InferContent<typeof result.dimensions.xx.domain_d>, DomainOutputOrdinal<string>>, true>
	type XXRangeD = Assert<IsEqual<InferContent<typeof result.dimensions.xx.range_d>, RangeOutput<number>>, true>
	
	
	type HasDefaultXScaler = Assert<Contains<InferContent<typeof result.dimensions.x.scaler_d>, 'bandwidth'>, true>;
	type HasDefaultYScaler = Assert<Contains<InferContent<typeof result.dimensions.y.scaler_d>, 'interpolate'>, true>;
	type HasDefaultXXScaler = Assert<Contains<InferContent<typeof result.dimensions.xx.scaler_d>, 'interpolate'>, true>;

}

// todo
// [y] Option for reversing range
// [x] make chartFactory dependencies keyed
// [y] Default scale types should be exposed in return
// [ ] Default scale types (in implementation)
// [y] add meta(data)
// [y] turn inputs into optional stores and outputs into always stores