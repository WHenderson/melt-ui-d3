import type { ChartBasics, DimensionContinuous, DimensionDiscrete } from './types-describe.js';
import { scalerFactoryBand } from './scale.js';
import { h_continuous } from './describe.js';
import type { MaybeStores, Stores } from './types-util.js';


export function createChart<ROW, META, DIMENSIONS extends { [k: string]: MaybeStores<DimensionDiscrete<ROW, META, any, any, any, any> | DimensionContinuous<ROW, META, any, any, any, any>> }>(props:
		 MaybeStores<ChartBasics<ROW, META>> &
		 {
			 dimensions: DIMENSIONS
		 }
): Stores<ChartBasics<ROW, META>> & {
	dimensions: {
		[k in keyof DIMENSIONS]: DIMENSIONS[k] extends MaybeStores<DimensionDiscrete<ROW, META, infer DOMAINTYPE, infer RANGETYPE, infer DOMAINSIMPLETYPE, infer SCALER>>
			? Stores<DimensionDiscrete<ROW, META, DOMAINTYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER>>
			: DIMENSIONS[k] extends MaybeStores<DimensionContinuous<ROW, META, infer DOMAINTYPE, infer RANGETYPE, infer DOMAINSIMPLETYPE, infer SCALER>>
			? Stores<DimensionContinuous<ROW, META, DOMAINTYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER>>
			: never;
	}
}
{
	return null!;
}

const r = createChart({
	data: [{y:'1',a:1}, {y:'2',a:2}],
	meta: { meta: 'val'},
	width: 10,
	height: 12,
	dimensions: {
		x: {
			discrete: true,
			accessor: 'y',
			scalerFactory: scalerFactoryBand
		},
		y: {
			accessor: 'a',
			...h_continuous
		}
	}
})

const x = r.dimensions.x;
const y = r.dimensions.y;