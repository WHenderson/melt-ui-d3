import type {
	ChartBasics,
	DimensionContinuousPartial,
	DimensionDiscrete,
	DimensionDiscretePartial,
} from './types-describe.js';
import type { Accessor, AccessorKey, DomainField, Scaler } from './types-basic.js';
import type { Area } from '../chart2/types-input.js';
import { scalerFactoryBand, scalerFactoryLinear, scalerFactorySqrt } from './scale.js';
import type { StringValue } from './types-util.js';
import type { NumberValue } from 'd3-scale';

export const h_range = ({ area }: { area: Area}) => [0, area.padding.inner.width] as [number, number];

export const h_discrete = {
	range: h_range,
	scalerFactory: scalerFactoryBand
}

export const h_continuous = {
	range: h_range,
	extentDefault: 0,
	scalerFactory: scalerFactoryLinear
}

export const v_range = ({ area }: { area: Area}) => [0, area.padding.inner.height] as [number, number];

export const v_discrete = {
	range: v_range,
	scalerFactory: scalerFactoryBand
}

export const v_continuous = {
	range: v_range,
	extentDefault: 0,
	scalerFactory: scalerFactoryLinear
}

type InferDomain<ROW, ACCESSOR> =
	ACCESSOR extends keyof ROW
	? ROW[ACCESSOR]
	: ACCESSOR extends (...args: any) => infer R
	? (
			R extends DomainField<infer D>
			? D
			: never
	)
	: never
;
type InferDomainIsSimple<ROW, ACCESSOR, SIMPLEDOMAINTYPE> = 
	InferDomain<ROW, ACCESSOR> extends SIMPLEDOMAINTYPE
		? InferDomain<ROW, ACCESSOR>
		: never;

export function describeChart<ROW, META, CHART extends ChartBasics<ROW, META>>(
	props: ChartBasics<ROW, META> & CHART
) : CHART & {
	dimensions: object;
	describeDiscrete: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, unknown>, DIMENSION extends DimensionDiscretePartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, RANGETYPE, DOMAINSIMPLETYPE, SCALER>, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>, RANGETYPE, DOMAINSIMPLETYPE extends StringValue>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension: DimensionDiscretePartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, RANGETYPE, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, idt: InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, sdt: DOMAINSIMPLETYPE, rt: RANGETYPE } } }
	);
	describeContinuous: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, unknown>, DIMENSION extends DimensionContinuousPartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, RANGETYPE, DOMAINSIMPLETYPE, SCALER>, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>, RANGETYPE, DOMAINSIMPLETYPE extends NumberValue>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension: DimensionContinuousPartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, RANGETYPE, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR } } }
	);
	describeDiscreteHorizontal: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, unknown>, DIMENSION extends DimensionDiscretePartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER>, DOMAINSIMPLETYPE extends StringValue, SCALER extends Scaler<DOMAINSIMPLETYPE, number> = ReturnType<typeof h_discrete['scalerFactory']>>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DimensionDiscretePartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, idt: InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, sdt: DOMAINSIMPLETYPE } } }
	);
	describeContinuousHorizontal: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, unknown>, DIMENSION extends DimensionContinuousPartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER>, DOMAINSIMPLETYPE extends NumberValue, SCALER extends Scaler<DOMAINSIMPLETYPE, number> = ReturnType<typeof h_continuous['scalerFactory']>>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DimensionContinuousPartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, idt: InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, sdt: DOMAINSIMPLETYPE } } }
	);
	describeDiscreteVertical: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, unknown>, DIMENSION extends DimensionDiscretePartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER>, DOMAINSIMPLETYPE extends StringValue, SCALER extends Scaler<DOMAINSIMPLETYPE, number> = ReturnType<typeof v_discrete['scalerFactory']>>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DimensionDiscretePartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, idt: InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, sdt: DOMAINSIMPLETYPE } } }
		);
	describeContinuousVertical: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, unknown>, DIMENSION extends DimensionContinuousPartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER>, DOMAINSIMPLETYPE extends NumberValue, SCALER extends Scaler<DOMAINSIMPLETYPE, number> = ReturnType<typeof v_continuous['scalerFactory']>>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DimensionContinuousPartial<META, InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, number, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, idt: InferDomainIsSimple<ROW, ACCESSOR, DOMAINSIMPLETYPE>, sdt: DOMAINSIMPLETYPE } } }
		);
} {
	return {
		...props,
		dimensions: {},

		describeDiscrete(name, accessor, dimension) {
			return {
				...this,
				dimensions: {
					...this.dimensions,
					[name]: {
						discrete: true as const,
						accessor,
						...dimension
					}
				} as never // typescript is treating name as a string instead of NAME
			}
		},
		describeContinuous(name, accessor, dimension) {
			return {
				...this,
				dimensions: {
					...this.dimensions,
					[name]: {
						accessor,
						...dimension
					}
				}
			} as never // typescript is treating name as a string instead of NAME
		},
		describeDiscreteHorizontal(name, accessor, dimension) {
			return (this as any).describeDiscrete(this, name, accessor, Object.assign({}, h_discrete, dimension));
		},
		describeContinuousHorizontal(name, accessor, dimension) {
			return (this as any).describeContinuous(this, name, accessor, Object.assign({}, h_continuous, dimension));
		},
		describeDiscreteVertical(name, accessor, dimension) {
			return (this as any).describeDiscrete(this, name, accessor, Object.assign({}, v_discrete, dimension));
		},
		describeContinuousVertical(name, accessor, dimension) {
			return (this as any).describeContinuous(this, name, accessor, Object.assign({}, v_continuous, dimension));
		}
	}
}

const test = { range: h_range, scalerFactory: scalerFactoryBand };

const r = describeChart({
	data: [{y:'1',a:1}, {y:'2',a:2}],
	meta: { meta: 'val'},
	width: 10,
	height: 12
})

	.describeDiscrete('a1', 'a', { range: [1, 25] })

	//.describeDiscrete('a2', row => row.a, { range: [1, 25] })
	//.describeDiscrete('a3', row => [1,2,3], { range: [1, 25] })
	//.describeDiscrete('a4', row => ['1','2','3'], { range: [1, 25] })
	.describeDiscrete('a5', 'a', { range: [1, 25], scalerFactory: scalerFactoryBand })
	//.describeDiscrete('a6', 'a', { range: h_range, scalerFactory: scalerFactoryBand })
	//.describeContinuous('a6', 'a', { extentDefault: 0, range: h_range, scalerFactory: scalerFactoryLinear })
	//.describeContinuous('a7', 'a', { extentDefault: 0, range: h_range, scalerFactory: scalerFactoryLinear })
	//.describeContinuous('a7', 'a', h_continuous)
	//.describeContinuous('a7', 'a', h_continuous)
	//.describeDiscrete('x', 'a', { range: h_range, scalerFactory: scalerFactoryBand })
	//.describeDiscreteHorizontal('x5', row => row.a)
	//.describeDiscreteVertical('y', 'y')
	//.describeContinuous('z', row => row.a, h_continuous)

	.describeDiscreteHorizontal('x1', 'y')


	//.describeContinuousVertical('y1', 'a')


const {
	a1,
	a5,
	x1
} = r.dimensions;

const da1 = a1;
const da5 = a5;
const dx1 = x1;

