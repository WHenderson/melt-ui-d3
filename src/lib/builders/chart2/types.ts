import type { Readable, Writable } from 'svelte/store';
import type { AsStores, MaybeStore } from '$lib';

export type Map2OptionalStore<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : TYPE[k] | Readable<TYPE[k]> }
export type Map2Stores<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : Readable<TYPE[k]> }


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
	data: ROW[],
	width: number,
	height: number,
	ordinal: undefined | false,
	accessor: AccessorInput<ROW, DOMAINTYPE>,
	extents: undefined | ExtentsInputScalar<DOMAINTYPE>,
	extentDefault: undefined | DOMAINTYPE,
	domain: undefined | DomainInputScalar<DOMAINTYPE>,
	range: undefined | RangeInput<RANGETYPE>,
	accessor_d: AccessorOutput<ROW, DOMAINTYPE>,
	extents_d: ExtentsOutputScalar<DOMAINTYPE>,
	domain_d: DomainOutputScalar<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryScalar<ROW, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsScalar<ROW, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryPropsOrdinal<ROW, DOMAINTYPE, RANGETYPE> {
	data: ROW[],
	width: number,
	height: number,
	ordinal: true,
	accessor: AccessorInput<ROW, DOMAINTYPE>,
	sort: undefined | CompareFunc<DOMAINTYPE>,
	extents: undefined | ExtentsInputOrdinal<DOMAINTYPE>,
	domain: undefined | DomainInputOrdinal<DOMAINTYPE>,
	range: undefined | RangeInput<RANGETYPE>,
	accessor_d: AccessorOutput<ROW, DOMAINTYPE>,
	extents_d: ExtentsOutputOrdinal<DOMAINTYPE>,
	domain_d: DomainOutputOrdinal<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryOrdinal<ROW, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsOrdinal<ROW, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryProps<ROW, DOMAINTYPE, RANGETYPE> {
	data: ROW[],
	width: number,
	height: number,
	ordinal: boolean,
	accessor: AccessorInput<ROW, DOMAINTYPE>,
	sort: undefined | CompareFunc<DOMAINTYPE>,
	extents: undefined | ExtentsInput<DOMAINTYPE>,
	extentDefault: undefined | DOMAINTYPE,
	domain: undefined | DomainInput<DOMAINTYPE>,
	range: undefined | RangeInput<RANGETYPE>,
	accessor_d: AccessorOutput<ROW, DOMAINTYPE>,
	extents_d: ExtentsOutput<DOMAINTYPE>,
	domain_d: DomainOutput<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactory<ROW, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryProps<ROW, DOMAINTYPE, RANGETYPE>) => SCALER

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

interface DimensionInput<ROW, ACCESSOR extends AccessorInput<ROW, unknown>, RANGETYPE, SCALER extends Scaler<InferDomainType<ROW, ACCESSOR>, RANGETYPE>> {
	ordinal?: boolean,
	accessor: ACCESSOR,
	sort?: CompareFunc<InferDomainType<ROW, ACCESSOR>>,
	extents?: ExtentsInput<InferDomainType<ROW, ACCESSOR>>,
	extentDefault?: InferDomainType<ROW, ACCESSOR>
	domain?: DomainInput<InferDomainType<ROW, ACCESSOR>>,
	range?: RangeInput<RANGETYPE>,
	scalerFactory?: ScalerFactory<ROW, InferDomainType<ROW, ACCESSOR>, RANGETYPE, SCALER>,
}

interface DimensionOutput<ROW, ACCESSOR extends AccessorInput<ROW, unknown>, RANGETYPE, SCALER extends Scaler<InferDomainType<ROW, ACCESSOR>, RANGETYPE>> extends DimensionInput<ROW, ACCESSOR, RANGETYPE, SCALER> {
	accessor_d: InferAccessorOutput<ROW, ACCESSOR>,
	extents_d: ExtentsOutput<InferDomainType<ROW, ACCESSOR>>,
	domain_d: DomainOutput<InferDomainType<ROW, ACCESSOR>>,
	range_d: RangeOutput<RANGETYPE>,
	scaler_d: Scaler<InferDomainType<ROW, ACCESSOR>, RANGETYPE>,
	scaled_d: AccessorScaledOutput<ROW, RANGETYPE>
}

interface DimensionGeneric<DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> {
	domainType: DOMAINTYPE,
	rangeType: RANGETYPE,
	scaler: SCALER
}

declare function createChart<
	ROW,
	XACCESSOR extends AccessorInput<NoInfer<ROW>, unknown>, XRANGETYPE, XSCALER extends Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE>,
	//X extends DimensionInput<NoInfer<ROW>, any, any, any, any>,
	Y extends DimensionGeneric<unknown, unknown, never>,
	Z extends DimensionGeneric<unknown, unknown, never>,
	R extends DimensionGeneric<unknown, unknown, never>
>(props: {
	data: ROW[],
	width: number,
	height: number,
	x: DimensionInput<NoInfer<ROW>, XACCESSOR, XRANGETYPE, XSCALER>
	//x: X
	//y?: DimensionInput<NoInfer<ROW>, Y['domainType'], Y['rangeType'], Y['scaler']>,
	//z?: DimensionInput<NoInfer<ROW>, ZDOMAINTYPE, ZRANGETYPE, ZSCALER>,
	//r?: DimensionInput<NoInfer<ROW>, RDOMAINTYPE, RRANGETYPE, RSCALER>
}) : {
	x: DimensionOutput<ROW, XACCESSOR, XRANGETYPE, XSCALER>
	//x: X extends DimensionInput<ROW, infer DOMAIN, infer ACCESSOR, infer RANGETYPE, infer SCALER>
	//	 ? DimensionOutput<ROW, DOMAIN, ACCESSOR, RANGETYPE, SCALER>
	//	 : never
};

// are individual signatures the only real way to handle string (member) based accessors?
// x * y * z * r = 2 * 2 * 3 * 3 = 36 <= scalar vs ordinal
// 2x * 2y * 2z *2r = 4 * 4 * 6 * 6 = 576 <= scalar vs orginal in both string member and accessor... and then there's still accessorOne vs accessorMany...

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
		accessor: row => row.year,
		//accessor: 'year'
		//accessor: 'other'
	},
	//y: {
	//	ordinal: true,
	//	accessor: (row) => [row.apples, row.apples]
	//}
});

type R = typeof result;
type X = R['x'];

type XAccessor = R['x']['accessor'];
const xaccessor: XAccessor = result.x.accessor;
const x0 = xaccessor(data[0]);
const xfail = xaccessor({ unrelated: true });

type XAccessorD = R['x']['accessor_d'];
const xaccessor_d: XAccessorD = result.x.accessor_d;
const x0d = xaccessor_d(data[0]);
const xfaild = xaccessor_d({ unrelated: true });


