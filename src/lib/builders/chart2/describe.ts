import type {
	Area,
	ChartBasics,
	Dimension,
	DimensionContinuous,
	DimensionDiscrete,
	DomainField,
	Scaler,
	Sides,
} from './types-input.js';
import type { Map2OptionalStore } from './types-util.js';
import { scaleFactoryBand, scaleFactoryLinear } from '../chart/scale.js';

export function describeChart<ROW, META, CHART extends ChartBasics<ROW, META>>(
	props: ChartBasics<ROW, META> & CHART
) : CHART & {
	//data: ROW[];
	//meta?: META;
	//margin?: Sides;
	//padding?: Sides;
	dimensions: {};
 	describeDiscrete: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends keyof ROW | ((row: ROW) => DomainField<DOMAINTYPE>), DIMENSION extends Omit<DimensionDiscrete<ROW, META, DOMAINTYPE, RANGETYPE, SCALER>, 'accessor'>, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>, DOMAINTYPE, RANGETYPE>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DIMENSION) => THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR }}}
	),
	describeContinuous: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends keyof ROW | ((row: ROW) => DomainField<DOMAINTYPE>), DIMENSION extends Omit<DimensionContinuous<ROW, META, DOMAINTYPE, RANGETYPE, SCALER>, 'accessor'>, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>, DOMAINTYPE, RANGETYPE>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DIMENSION) => THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR } }}
	)
}
{
	return {
		...props,
		dimensions: {},
		describeDiscrete(this, name, accessor, dimension?) {
			return {
				...this,
				dimensions: {
					...this.dimensions,
					[name]: { discrete: true, accessor, ...dimension },
				}
			} as any;
		},
		describeContinuous(this, name, accessor, dimension?) {
			return {
				...this,
				dimensions: {
					...this.dimensions,
					[name]: {discrete: false, accessor, ...dimension},
				}
			} as any;
		}
	}
}

const h_range = ({ area }: { area: Area}) => [0,area.padding.inner.width] as [number, number];

const h_discrete = { range: h_range, scalerFactory: scaleFactoryBand };
const h_continuous = { extentDefault: 0, range: h_range, scaleFactory: scaleFactoryLinear };


const r = describeChart({
	data: [{y:'1',a:1}, {y:'2',a:2}],
	meta: { name: 'meta '},
	width: 10,
	height: 12
}).describeDiscrete('x', 'a', h_discrete )
	.describeContinuous('y', row => row.y, h_continuous)

const { data, meta, width, height , dimensions} = r;
const { x, y } = dimensions;
type X = typeof x;
type Y = typeof y;