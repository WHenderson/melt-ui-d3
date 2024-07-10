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

const h_range = ({ area }: { area: Area}) => [0, area.padding.inner.width] as [number, number];

const h_discrete = {
	range: h_range,
	scalerFactory: scalerFactoryBand
}

const h_continuous = {
	range: h_range,
	extentDefault: 0,
	scalerFactory: scalerFactoryLinear
}

const v_range = ({ area }: { area: Area}) => [0, area.padding.inner.height] as [number, number];

const v_discrete = {
	range: v_range,
	scalerFactory: scalerFactoryBand
}

const v_continuous = {
	range: v_range,
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

export function describeChart<ROW, META, CHART extends ChartBasics<ROW, META>>(
	props: ChartBasics<ROW, META> & CHART
) : CHART & {
	dimensions: object;
	describeDiscrete: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, DOMAINTYPE>, DIMENSION extends DimensionDiscretePartial<META, DOMAINTYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER>, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>, DOMAINTYPE extends DOMAINSIMPLETYPE, RANGETYPE, DOMAINSIMPLETYPE extends StringValue>
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DimensionDiscretePartial<META, DOMAINTYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, dt: InferDomain<ROW, ACCESSOR>, rt: RANGETYPE } } }
	);
	describeContinuous: (
		<THIS extends { dimensions: object }, NAME extends string, ACCESSOR extends Accessor<ROW, META, DOMAINTYPE>, DIMENSION extends DimensionContinuousPartial<META, DOMAINTYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER>, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>, DOMAINTYPE extends DOMAINSIMPLETYPE, RANGETYPE, DOMAINSIMPLETYPE extends NumberValue >
		(this: THIS, name: NAME, accessor: ACCESSOR, dimension: DimensionContinuousPartial<META, DOMAINTYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER> & DIMENSION)
			=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR } } }
	);

	// inferrance not working on these :-P
	//describeDiscreteHorizontal: (
	//	<THIS extends { dimensions: object }, NAME extends string, DOMAINTYPE extends StringValue, ACCESSOR extends Accessor<ROW, META, DOMAINTYPE>, DIMENSION extends DimensionDiscretePartial<META, DOMAINTYPE, number, SCALER>, SCALER extends Scaler<DOMAINTYPE, number> = ReturnType<typeof h_discrete['scalerFactory']>>
	//	(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DIMENSION)
	//		=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true, dt: DOMAINTYPE } } }
	//	);
	//describeContinuousHorizontal: (
	//	<THIS, NAME extends string, ACCESSOR extends Accessor<ROW, META, DOMAINTYPE>, DIMENSION extends Partial<DimensionContinuousPartial<META, DOMAINTYPE, number, SCALER>>, DOMAINTYPE extends NumberValue, SCALER extends Scaler<DOMAINTYPE, number> = ReturnType<typeof h_continuous['scalerFactory']>>
	//	(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DIMENSION)
	//		=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR } } }
	//	);
	//describeDiscreteVertical: (
	//	<THIS , NAME extends string, ACCESSOR extends Accessor<ROW, META, DOMAINTYPE>, DIMENSION extends Partial<DimensionDiscretePartial<META, DOMAINTYPE, number, SCALER>>, DOMAINTYPE extends StringValue, SCALER extends Scaler<DOMAINTYPE, number> = ReturnType<typeof v_discrete['scalerFactory']>>
	//	(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DIMENSION)
	//		=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR, discrete: true } } }
	//	);
	//describeContinuousVertical: (
	//	<THIS, NAME extends string, ACCESSOR extends Accessor<ROW, META, DOMAINTYPE>, DIMENSION extends Partial<DimensionContinuousPartial<META, DOMAINTYPE, number, SCALER>>, DOMAINTYPE extends NumberValue, SCALER extends Scaler<DOMAINTYPE, number> = ReturnType<typeof v_continuous['scalerFactory']>>
	//	(this: THIS, name: NAME, accessor: ACCESSOR, dimension?: DIMENSION)
	//		=> THIS & { dimensions: { [k in NAME]: DIMENSION & { accessor: ACCESSOR } } }
	//	);
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
		//describeDiscreteHorizontal(name, accessor, dimension) {
		//	return (this as any).describeDiscrete(this, name, accessor, Object.assign({}, h_discrete, dimension));
		//},
		//describeContinuousHorizontal(name, accessor, dimension) {
		//	return (this as any).describeContinuous(this, name, accessor, Object.assign({}, h_continuous, dimension));
		//},
		//describeDiscreteVertical(name, accessor, dimension) {
		//	return (this as any).describeDiscrete(this, name, accessor, Object.assign({}, v_discrete, dimension));
		//},
		//describeContinuousVertical(name, accessor, dimension) {
		//	return (this as any).describeContinuous(this, name, accessor, Object.assign({}, v_continuous, dimension));
		//}
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
	.describeDiscrete('a2', row => row.a, { range: [1, 25] })
	.describeDiscrete('a3', row => [1,2,3], { range: [1, 25] })
	.describeDiscrete('a4', row => ['1','2','3'], { range: [1, 25] })
	.describeDiscrete('a5', 'a', { range: [1, 25], scalerFactory: scalerFactoryBand })
	//.describeDiscrete('x', 'a', { range: h_range, scalerFactory: scalerFactoryBand })
	//.describeDiscreteHorizontal('x5', row => row.a)
	//.describeDiscreteVertical('y', 'y')
	//.describeContinuous('z', row => row.a, h_continuous)

const {
	a1,
	a2,
	a3,
	a4,
} = r.dimensions;

const dimension = a4;

