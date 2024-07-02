import type { Readable, Writable } from 'svelte/store';
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

export type InferDomainType<ROW, ACCESSOR> =
	ACCESSOR extends keyof ROW
		? ROW[ACCESSOR]
		: ACCESSOR extends (row: ROW) => infer RETURN
			? (
				RETURN extends (infer DOMAINTYPE)[]
					? DOMAINTYPE
					: RETURN
				)
			: never;

export type InferAccessorOutput<ROW, ACCESSOR> =
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

export interface ScalerFactoryPropsScalar<META, DOMAINTYPE, RANGETYPE> {
	meta: META,
	ordinal: undefined | false,
	domain_d: DomainOutputScalar<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryScalar<META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsScalar<META, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryPropsOrdinal<META, DOMAINTYPE, RANGETYPE> {
	meta: META,
	ordinal: true,
	domain_d: DomainOutputOrdinal<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryOrdinal<META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsOrdinal<META, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryProps<META, DOMAINTYPE, RANGETYPE> {
	meta: META,
	ordinal?: boolean,
	domain_d: DomainOutput<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryProps<META, DOMAINTYPE, RANGETYPE>) => SCALER

export type DimensionInput<
	ROW,
	META,
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
				scalerFactory?: ScalerFactoryOrdinal<META, InferDomainType<ROW, ACCESSOR>, RANGETYPE, SCALER>
			}
			: {
				ordinal?: false
				sort?: undefined,
				extents?: ExtentsInputScalar<InferDomainType<ROW, ACCESSOR>>,
				extentDefault?: InferDomainType<ROW, ACCESSOR>
				domain?: DomainInputScalar<InferDomainType<ROW, ACCESSOR>>,
				scalerFactory?: ScalerFactoryScalar<META, InferDomainType<ROW, ACCESSOR>, RANGETYPE, SCALER>,
			}
	)

export type DimensionOutput<
	ROW,
	META,
	ACCESSOR extends AccessorInput<ROW, unknown>,
	ORDINAL extends boolean,
	RANGETYPE,
	SCALER extends Scaler<InferDomainType<ROW, ACCESSOR>, RANGETYPE>
> =
	DimensionInput<ROW, META, ACCESSOR, ORDINAL, RANGETYPE, SCALER> &
	{
		accessor_d: InferAccessorOutput<ROW, ACCESSOR>,
		range_d: RangeOutput<RANGETYPE>,
		scaler_d: SCALER,
		scaled_d: AccessorScaledOutput<ROW, RANGETYPE>
	} &
	(
	[ORDINAL] extends [true]
		? {
			extents_d: ExtentsOutputOrdinal<InferDomainType<ROW, ACCESSOR>>,
			domain_d: DomainOutputOrdinal<InferDomainType<ROW, ACCESSOR>>,

		}
		: {
			extents_d: ExtentsOutputScalar<InferDomainType<ROW, ACCESSOR>>,
			domain_d: DomainOutputScalar<InferDomainType<ROW, ACCESSOR>>,
		}
	)
