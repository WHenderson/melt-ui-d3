import type { ChartBasics, DimensionContinuous, DimensionDiscrete } from './types-describe.js';
import { scalerFactoryBand } from './scale.js';
import { h_continuous } from './describe.js';


export function createChart<ROW, META, DIMENSIONS extends { [k: string]: DimensionDiscrete<ROW, META, any, any, any, any> | DimensionContinuous<ROW, META, any, any, any, any> }>(props:
		 ChartBasics<ROW, META> &
		 {
			 dimensions: DIMENSIONS
		 }
): { dimensions: DIMENSIONS } {
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