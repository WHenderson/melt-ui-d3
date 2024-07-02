import type { Readable, Writable } from 'svelte/store';
import type { AsStores, MaybeStore } from '$lib';
import { type scaleFactoryBand, scaleFactoryLinear } from './scale.js';
import { type NumberValue, type ScaleBand, scaleLinear, type ScaleLinear } from 'd3-scale';

export type Map2OptionalStore<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : TYPE[k] | Readable<TYPE[k]> }
export type Map2Stores<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : Readable<TYPE[k]> }
export type StringValue = { toString(): string };

export type ValidKeys<ROW, DOMAINTYPE> = { [k in keyof ROW]: ROW[k] extends DOMAINTYPE ? k : never }[keyof ROW];


export type AccessorInputOne<ROW, DOMAINTYPE> =
	((row: ROW) => DOMAINTYPE) |
	ValidKeys<ROW, DOMAINTYPE>;

export type AccessorInputMany<ROW, DOMAINTYPE> =
	((row: ROW) => DOMAINTYPE[]) |
	ValidKeys<ROW, DOMAINTYPE[]>;

export type AccessorInput<ROW, DOMAINTYPE> =
	AccessorInputMany<ROW, DOMAINTYPE> |
	AccessorInputOne<ROW, DOMAINTYPE>;

export type AccessorOutputOne<ROW, DOMAINTYPE> =
	((row: ROW) => DOMAINTYPE);

export type AccessorOutputMany<ROW, DOMAINTYPE> =
	((row: ROW) => DOMAINTYPE[]);

export type AccessorOutput<ROW, DOMAINTYPE> =
	AccessorOutputMany<ROW, DOMAINTYPE> |
	AccessorOutputOne<ROW, DOMAINTYPE>;

type InferDomainType<ROW, ACCESSOR> =
	ACCESSOR extends keyof ROW
		? ROW[ACCESSOR]
		: ACCESSOR extends (row: ROW) => infer RETURN
			? (
				RETURN extends (infer DOMAINTYPE)[]
					? DOMAINTYPE
					: RETURN
				)
			: never;

type InferAccessorOutput<ROW, ACCESSOR> =
	ACCESSOR extends keyof ROW
		? (
			ROW[ACCESSOR] extends (infer DOMAINTYPE)[]
				? AccessorOutputMany<ROW, DOMAINTYPE>
				: AccessorOutputOne<ROW, ROW[ACCESSOR]>
			)
		: ACCESSOR extends (row: ROW) => infer RETURN
			? (
				RETURN extends (infer DOMAINTYPE)[]
					? AccessorOutputMany<ROW, DOMAINTYPE>
					: AccessorOutputOne<ROW, RETURN>
				)
			: never;

export type CompareFunc<VALUETYPE> = (a: VALUETYPE, b: VALUETYPE) => number;

export type ExtentsInputScalar<DOMAINTYPE> =
	[DOMAINTYPE | null, DOMAINTYPE | null];

export type ExtentsInputOrdinal<DOMAINTYPE> =
	[DOMAINTYPE | null, DOMAINTYPE | null] |
	DOMAINTYPE[];

export type ExtentsInput<DOMAINTYPE> =
	ExtentsInputScalar<DOMAINTYPE> |
	ExtentsInputOrdinal<DOMAINTYPE>;

export type ExtentsOutputScalar<DOMAINTYPE> =
	[DOMAINTYPE, DOMAINTYPE];

export type ExtentsOutputOrdinal<DOMAINTYPE> =
	DOMAINTYPE[];

export type ExtentsOutput<DOMAINTYPE> =
	ExtentsOutputScalar<DOMAINTYPE> |
	ExtentsOutputOrdinal<DOMAINTYPE>;

export type DomainInputScalar<DOMAINTYPE> =
	[DOMAINTYPE | null, DOMAINTYPE | null] |
	((domain: [DOMAINTYPE | null, DOMAINTYPE | null], extentDefault: DOMAINTYPE) => [DOMAINTYPE, DOMAINTYPE]);

export type DomainInputOrdinal<DOMAINTYPE> =
	DOMAINTYPE[] |
	((domain: DOMAINTYPE[]) => DOMAINTYPE[]);

export type DomainInput<DOMAINTYPE> =
	DomainInputScalar<DOMAINTYPE> |
	DomainInputOrdinal<DOMAINTYPE>;

export type DomainOutputScalar<DOMAINTYPE> =
	[DOMAINTYPE, DOMAINTYPE];

export type DomainOutputOrdinal<DOMAINTYPE> =
	DOMAINTYPE[];

export type DomainOutput<DOMAINTYPE> =
	DomainOutputScalar<DOMAINTYPE> |
	DomainOutputOrdinal<DOMAINTYPE>;

export type RangeInput<RANGETYPE> =
	[RANGETYPE, RANGETYPE, ...RANGETYPE[]] |
	((range: [RANGETYPE, RANGETYPE, ...RANGETYPE[]], { width, height }: { width: number, height: number }) => [RANGETYPE, RANGETYPE, ...RANGETYPE[]]);

export type RangeOutput<RANGETYPE> =
	[RANGETYPE, RANGETYPE, ...RANGETYPE[]];

export type Scaler<DOMAINTYPE, RANGETYPE> = {
	(value: DOMAINTYPE): RANGETYPE;
};

export type AccessorScaledOutputOne<ROW, RANGETYPE> =
	((row: ROW) => RANGETYPE);

export type AccessorScaledOutputMany<ROW, RANGETYPE> =
	((row: ROW) => RANGETYPE[]);

export type AccessorScaledOutput<ROW, RANGETYPE> =
	AccessorScaledOutputOne<ROW, RANGETYPE> |
	AccessorScaledOutputMany<ROW, RANGETYPE>;

export interface ScalerFactoryPropsScalar<ROW, DOMAINTYPE, RANGETYPE> {
	ordinal: undefined | false,
	domain_d: DomainOutputScalar<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryScalar<ROW, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsScalar<ROW, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryPropsOrdinal<ROW, DOMAINTYPE, RANGETYPE> {
	ordinal: true,
	domain_d: DomainOutputOrdinal<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryOrdinal<ROW, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsOrdinal<ROW, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryProps<ROW, DOMAINTYPE, RANGETYPE> {
	ordinal?: boolean,
	domain_d: DomainOutput<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactory<ROW, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryProps<ROW, DOMAINTYPE, RANGETYPE>) => SCALER

type DimensionInput<
	ROW,
	ACCESSOR extends AccessorInput<ROW, unknown>,
	ORDINAL extends boolean,
	RANGETYPE,
	SCALER extends Scaler<InferDomainType<ROW, ACCESSOR>, RANGETYPE>
> =
	{
		accessor: ACCESSOR,
		range?: RangeInput<RANGETYPE>,
		reverse?: boolean,
	} &
	(
		[ORDINAL] extends [true]
			? {
				ordinal: ORDINAL,
				sort?: CompareFunc<InferDomainType<ROW, ACCESSOR>>,
				extents?: ExtentsInputOrdinal<InferDomainType<ROW, ACCESSOR>>,
				extentDefault?: undefined,
				domain?: DomainInputOrdinal<InferDomainType<ROW, ACCESSOR>>,
				scalerFactory?: ScalerFactoryOrdinal<ROW, InferDomainType<ROW, ACCESSOR>, RANGETYPE, SCALER>
			}
			: {
				ordinal?: false
				sort?: undefined,
				extents?: ExtentsInputScalar<InferDomainType<ROW, ACCESSOR>>,
				extentDefault?: InferDomainType<ROW, ACCESSOR>
				domain?: DomainInputScalar<InferDomainType<ROW, ACCESSOR>>,
				scalerFactory?: ScalerFactoryScalar<ROW, InferDomainType<ROW, ACCESSOR>, RANGETYPE, SCALER>,
			}
	)

type DimensionOutput<
	ROW,
	ACCESSOR extends AccessorInput<ROW, unknown>,
	ORDINAL extends boolean,
	RANGETYPE,
	SCALER extends Scaler<InferDomainType<ROW, ACCESSOR>, RANGETYPE>
> =
	DimensionInput<ROW, ACCESSOR, ORDINAL, RANGETYPE, SCALER> &
	{
		accessor_d: InferAccessorOutput<ROW, ACCESSOR>,
		extents_d: ExtentsOutput<InferDomainType<ROW, ACCESSOR>>,
		domain_d: DomainOutput<InferDomainType<ROW, ACCESSOR>>,
		range_d: RangeOutput<RANGETYPE>,
		scaler_d: SCALER,
		scaled_d: AccessorScaledOutput<ROW, RANGETYPE>
	}

declare function createChart<
	ROW,

	XACCESSOR extends AccessorInput<ROW, unknown>, XORDINAL extends boolean,
	//XSCALER extends Scaler<InferDomainType<NoInfer<ROW>, XACCESSOR>, XRANGETYPE>,
	//XRANGETYPE = number,
	XSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, number> = (
			[XORDINAL] extends [true]
				? (
					InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>> extends StringValue
						? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, number> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>>
						: never
					)
				: (
					InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>> extends NumberValue
						? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, number> & ScaleLinear<number, number, never>
						: never
					)
			)

>(props: {
	data: ROW[],
	width: number,
	height: number,
	x: DimensionInput<ROW, XACCESSOR, XORDINAL, number, XSCALER>
}) : {
	x: DimensionOutput<ROW, XACCESSOR, XORDINAL, number, XSCALER>
};
/*
(
		XRANGETYPE extends number
			? (
				[XORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, XACCESSOR> extends StringValue
							? ReturnType<typeof scaleFactoryBand<InferDomainType<NoInfer<ROW>, XACCESSOR>, ROW>>
							: never
					)
					: (
						InferDomainType<NoInfer<ROW>, XACCESSOR> extends NumberValue
							? ReturnType<typeof scaleFactoryLinear<InferDomainType<NoInfer<ROW>, XACCESSOR>, ROW>>
							: never
					)
			)
			: never
	)
 */

// todo
// [y] Option for reversing range
// [ ] make chartFactory dependencies keyed
// [ ] Default scale types
// [ ] Default scale types should be exposed in return
// [ ] add meta(data)

// testing

type Row = { year: string, apples: number };
const data : Row[] = [
//const data = [
	{ year: '2016', apples: 10 },
	{ year: '2018', apples: 11 }
]

const result = createChart({
	data,
	width: 100,
	height: 100,
	x: {
		ordinal: true,
		//accessor: row => row.year,
		accessor: 'year'
		//accessor: 'apples'
		//accessor: 'other',
		//domain: ['x', 'y', 'z']
		//domain: [1,2,3]
		//domain: ['x', null]
	},
	//y: {
	//	ordinal: true,
	//	accessor: (row) => [row.apples, row.apples]
	//}
});

type R = typeof result;
type X = R['x'];

const xordinal = result.x.ordinal;

const xdomain = result.x.domain;

const xdomain_d = result.x.domain_d;

type XAccessor = R['x']['accessor'];
const xaccessor: XAccessor = result.x.accessor;
const x0 = xaccessor(data[0]);
const xfail = xaccessor({ unrelated: true });

type XAccessorD = R['x']['accessor_d'];
const xaccessor_d: XAccessorD = result.x.accessor_d;
const x0d = xaccessor_d(data[0]);
const xfaild = xaccessor_d({ unrelated: true });

const xscalerFactory = result.x.scalerFactory;

const xscaler_d = result.x.scaler_d;

result.x.scaler_d.clamp()
result.x.scaler_d.bandwidth()

//const s: ScaleLinear<number, number, never> & Scaler<number, number> = null!;
//
//s(1);

const s = scaleFactoryLinear({
	data: data,
	width: 10,
	height: 10,
	ordinal: true,
	accessor: (row: Row) => row.apples,//'year',
	sort: undefined,
	extents: undefined,
	extentDefault: undefined,
	domain: undefined,
	range: undefined,
	reverse: false,
	accessor_d: (row: Row) => row.apples,
	extents_d: [1,2],
	domain_d: [1,2],
	range_d: [1,2]
})

s(1);
s('x');

