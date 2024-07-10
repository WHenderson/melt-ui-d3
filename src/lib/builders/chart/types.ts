import type { Readable } from 'svelte/store';

export type OptionalStore<TYPE> = TYPE | Readable<TYPE>;
export type Map2OptionalStore<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : OptionalStore<TYPE[k]> }
export type Map2Stores<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : Readable<TYPE[k]> }
export type StringValue = { toString(): string };

export type ValidKeys<ROW, DOMAINTYPE> = { [k in keyof ROW]: ROW[k] extends DOMAINTYPE ? k : never }[keyof ROW];

export type SidesInput =
	number |
	{
		left: number,
		top: number,
		right: number,
		bottom: number,
	};

export type SidesOutput = {
	left: number,
	right: number,
	width: number,

	top: number,
	bottom: number,
	height: number
}

export type MarginInput = SidesInput;

export type MarginOutput = SidesOutput;

export type PaddingInput = SidesInput;

export type PaddingOutput = SidesOutput;

export type InnerArea = {
	innerWidth: number,
	innerHeight: number,
}

export type AreaOutput = {
	width: number,
	height: number,
	padding: PaddingOutput & InnerArea,
	margin: MarginOutput & InnerArea,
}

export type DomainAccessorInputOne<ROW, DOMAINTYPE> =
	((row: ROW) => DOMAINTYPE) |
	ValidKeys<ROW, DOMAINTYPE>;

export type DomainAccessorInputMany<ROW, DOMAINTYPE> =
	((row: ROW) => DOMAINTYPE[]) |
	ValidKeys<ROW, DOMAINTYPE[]>;

export type DomainAccessorInput<ROW, DOMAINTYPE> =
	DomainAccessorInputMany<ROW, DOMAINTYPE> |
	DomainAccessorInputOne<ROW, DOMAINTYPE>;

export type AccessorInput<ROW> =
	((row: ROW) => unknown) |
	keyof ROW;

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


export type InferAccessorScaledOutput<ROW, ACCESSOR, RANGETYPE> =
	ACCESSOR extends keyof ROW
		? (
			ROW[ACCESSOR] extends (infer DOMAINTYPE)[]
				? AccessorScaledOutputOne<ROW, RANGETYPE>
				: AccessorOutputOne<ROW, RANGETYPE>
			)
		: ACCESSOR extends (row: ROW) => infer RETURN
			? (
				RETURN extends (infer DOMAINTYPE)[]
					? AccessorOutputMany<ROW, RANGETYPE>
					: AccessorOutputOne<ROW, RANGETYPE>
				)
			: never;

export type CompareFunc<VALUETYPE> = (a: VALUETYPE, b: VALUETYPE) => number;

export type ExtentsInputScalar<DOMAINTYPE> =
	[DOMAINTYPE | null, DOMAINTYPE | null];

export type ExtentsInputOrdinal<DOMAINTYPE> =
	DOMAINTYPE[];

export type ExtentsInput<DOMAINTYPE> =
	ExtentsInputScalar<DOMAINTYPE> |
	ExtentsInputOrdinal<DOMAINTYPE>;

export type ExtentsOutputScalar<DOMAINTYPE> =
	[DOMAINTYPE, DOMAINTYPE];

export type ExtentsOutputOrdinal<DOMAINTYPE> =
	Set<DOMAINTYPE>;

export type ExtentsOutput<DOMAINTYPE> =
	ExtentsOutputScalar<DOMAINTYPE> |
	ExtentsOutputOrdinal<DOMAINTYPE>;

export type DomainInputScalarFunc<DOMAINTYPE> =
	((extents: [DOMAINTYPE, DOMAINTYPE], extentDefault: DOMAINTYPE) => DomainOutputScalar<DOMAINTYPE>);

export type DomainInputScalar<DOMAINTYPE> =
	[DOMAINTYPE | null, ...DOMAINTYPE[], DOMAINTYPE | null] |
	DomainInputScalarFunc<DOMAINTYPE>;

export type DomainInputOrdinalFunc<DOMAINTYPE> =
	((extents: Set<DOMAINTYPE>) => DomainOutputOrdinal<DOMAINTYPE>);

export type DomainInputOrdinal<DOMAINTYPE> =
	DOMAINTYPE[] |
	DomainInputOrdinalFunc<DOMAINTYPE>;

export type DomainInput<DOMAINTYPE> =
	DomainInputScalar<DOMAINTYPE> |
	DomainInputOrdinal<DOMAINTYPE>;

export type DomainOutputScalar<DOMAINTYPE> =
	[DOMAINTYPE, DOMAINTYPE, ...DOMAINTYPE[]];

export type DomainOutputOrdinal<DOMAINTYPE> =
	Set<DOMAINTYPE>;

export type DomainOutput<DOMAINTYPE> =
	DomainOutputScalar<DOMAINTYPE> |
	DomainOutputOrdinal<DOMAINTYPE>;

export type RangeInputFunc<RANGETYPE> =
	((props: AreaOutput) => RangeOutput<RANGETYPE>);

export type RangeInput<RANGETYPE> =
	[RANGETYPE, RANGETYPE, ...RANGETYPE[]] |
	RangeInputFunc<RANGETYPE>;

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

export interface ScalerFactoryPropsOrdinal<META, DOMAINTYPE, RANGETYPE> {
	meta: META,
	ordinal: boolean, //true,
	domain_d: DomainOutputOrdinal<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryOrdinal<META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsOrdinal<META, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryPropsScalar<META, DOMAINTYPE, RANGETYPE> {
	meta: META,
	ordinal: boolean, //undefined | false,
	domain_d: DomainOutputScalar<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactoryScalar<META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(props: ScalerFactoryPropsScalar<META, DOMAINTYPE, RANGETYPE>) => SCALER

export interface ScalerFactoryProps<META, DOMAINTYPE, RANGETYPE> {
	meta: META,
	ordinal: boolean, //undefined | boolean,
	domain_d: DomainOutput<DOMAINTYPE>,
	range_d: RangeOutput<RANGETYPE>,
}

export type ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	ScalerFactoryOrdinal<META, DOMAINTYPE, RANGETYPE, SCALER> |
	ScalerFactoryScalar<META, DOMAINTYPE, RANGETYPE, SCALER>;
	//(props: ScalerFactoryProps<META, DOMAINTYPE, RANGETYPE>) => SCALER

export type DimensionInput<
	ROW,
	META,
	ACCESSOR extends AccessorInput<ROW>,
	ORDINAL extends boolean,
	RANGETYPE,
	FACTORY extends ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER>,
	SCALER extends Scaler<DOMAINTYPE, RANGETYPE>,
	DOMAINTYPE = InferDomainType<ROW, ACCESSOR>,
> =
	Map2OptionalStore<{
		accessor: ACCESSOR,
		range?: RangeInput<RANGETYPE>,
		reverse?: boolean,
	}> &
	(
		[ORDINAL] extends [true]
			? {
				ordinal: true,
				o?: 'ordinal input'
			} &
			Map2OptionalStore<{
				sort?: CompareFunc<InferDomainType<ROW, ACCESSOR>>,
				extents?: ExtentsInputOrdinal<InferDomainType<ROW, ACCESSOR>>,
				extentDefault?: undefined,
				domain?: DomainInputOrdinal<InferDomainType<ROW, ACCESSOR>>,
				scalerFactory?:
					FACTORY extends ScalerFactoryOrdinal<META, DOMAINTYPE, RANGETYPE, SCALER>
					? FACTORY
					: never

			}>
			: {
				ordinal?: ORDINAL,
				o?: 'scalar input'
			} &
			Map2OptionalStore<{
				sort?: undefined,
				extents?: ExtentsInputScalar<InferDomainType<ROW, ACCESSOR>>,
				extentDefault?: InferDomainType<ROW, ACCESSOR>
				domain?: DomainInputScalar<InferDomainType<ROW, ACCESSOR>>,
				scalerFactory?:
						FACTORY extends ScalerFactoryScalar<META, DOMAINTYPE, RANGETYPE, SCALER>
						? FACTORY
					  : never,
			}>
	)

export type DimensionOutput<
	ROW,
	META,
	ACCESSOR extends AccessorInput<ROW>,
	ORDINAL extends boolean,
	RANGETYPE,
	SCALER extends Scaler<DOMAINTYPE, RANGETYPE>,
	DOMAINTYPE = InferDomainType<ROW, ACCESSOR>
> =
	// input
	Map2Stores<{
		accessor: ACCESSOR,
		range?: RangeInput<RANGETYPE>,
		reverse?: boolean,
	}> &
	(
		[ORDINAL] extends [true]
			? {
			ordinal: true,
			o: 'ordinal output',
		} &
			Map2Stores<{
				sort: undefined | CompareFunc<DOMAINTYPE>,
				extents: undefined | ExtentsInputOrdinal<DOMAINTYPE>,
				extentDefault: undefined,
				domain: undefined | DomainInputOrdinal<DOMAINTYPE>,
				scalerFactory: undefined | ScalerFactoryOrdinal<META, DOMAINTYPE, RANGETYPE, SCALER>
			}>
			: {
			ordinal?: false
			o: 'scalar output',
		} &
			Map2Stores<{
				sort: undefined,
				extents: undefined | ExtentsInputScalar<DOMAINTYPE>,
				extentDefault: undefined | DOMAINTYPE
				domain: undefined | DomainInputScalar<DOMAINTYPE>,
				scalerFactory: undefined | ScalerFactoryScalar<META, DOMAINTYPE, RANGETYPE, SCALER>,
			}>
		) &
	// output
	Map2Stores<{
		accessor_d: InferAccessorOutput<ROW, ACCESSOR>,
		range_d: RangeOutput<RANGETYPE>,
		scaler_d: SCALER,
		scaled_d: InferAccessorScaledOutput<ROW, ACCESSOR, RANGETYPE>
	}> &
	(
	[ORDINAL] extends [true]
		? Map2Stores<{
			extents_d: ExtentsOutputOrdinal<DOMAINTYPE>,
			domain_d: DomainOutputOrdinal<DOMAINTYPE>,

		}>
		: Map2Stores<{
			extents_d: ExtentsOutputScalar<DOMAINTYPE>,
			domain_d: DomainOutputScalar<DOMAINTYPE>,
		}>
	)
