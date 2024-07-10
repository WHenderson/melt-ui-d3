import type { Map2OptionalStore } from './types-util.js';

export interface Sides {
	top: number;
	left: number;
	bottom: number;
	right: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface Area extends Size {
	padding: Sides & {
		inner: Size;
		outer: Size;
	}
	margin: Sides & {
		inner: Size;
		outer: Size;
	}
}

export type DomainField<DOMAINTYPE> = DomainFieldSingle<DOMAINTYPE> | DomainFieldArray<DOMAINTYPE> | DomainFieldRecord<DOMAINTYPE>;
type DomainFieldSingle<DOMAINTYPE> = DOMAINTYPE;
type DomainFieldArray<DOMAINTYPE> = DOMAINTYPE[];
type DomainFieldRecord<DOMAINTYPE> = { [key: string]: DOMAINTYPE };

export type Scaler<DOMAINTYPE, RANGETYPE> = {
	(value: DOMAINTYPE): RANGETYPE;
};

export type DimensionBasic<ROW, META, DOMAINTYPE, RANGETYPE> = {
	accessor: keyof ROW | ((row: ROW) => DomainField<DOMAINTYPE>);
	range?:
		[RANGETYPE, RANGETYPE, ...RANGETYPE[]] |
		((props: { area: Area, meta: META }) => [RANGETYPE, RANGETYPE, ...RANGETYPE[]]);
	reverse?: boolean | ((props: { meta: META }) => boolean)
};

export type DimensionDiscrete<ROW, META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	DimensionBasic<ROW, META, DOMAINTYPE, RANGETYPE> &
	Map2OptionalStore<{
		sort?: (a: DOMAINTYPE, b: DOMAINTYPE) => number,
		extents?: DOMAINTYPE[] | Set<DOMAINTYPE> | ((props: { meta: META }) => Set<DOMAINTYPE>),
		domain?: DOMAINTYPE[] | Set<DOMAINTYPE> | ((props: { extents: ReadonlySet<DOMAINTYPE>, meta: META }) => ReadonlySet<DOMAINTYPE>),
		scalerFactory?: (props: {
			meta: META,
			domain_d: ReadonlySet<DOMAINTYPE>,
			range_d: [RANGETYPE, RANGETYPE, ...RANGETYPE[]]
		}) => SCALER,
	}>

export type DimensionContinuous<ROW, META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	DimensionBasic<ROW, META, DOMAINTYPE, RANGETYPE> &
	Map2OptionalStore<{
		extents?: [DOMAINTYPE | null, DOMAINTYPE | null] | ((props: { meta: META }) => [DOMAINTYPE | null, DOMAINTYPE | null]),
		extentDefault: DOMAINTYPE | ((props: { meta: META }) => DOMAINTYPE),
		domain?: [DOMAINTYPE | null, DOMAINTYPE | null] |  ((props: { extents: [DOMAINTYPE | null, DOMAINTYPE | null], defaultExtent: DOMAINTYPE, meta: META }) => [DOMAINTYPE, DOMAINTYPE])
		scalerFactory?: (props: {
			meta: META,
			domain_d: [DOMAINTYPE, DOMAINTYPE],
			range_d: [RANGETYPE, RANGETYPE, ...RANGETYPE[]]
		}) => SCALER
	}>

export type Dimension<ROW, META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>> =
	(
		{
			discrete: true
		}	&
		DimensionDiscrete<ROW, META, DOMAINTYPE, RANGETYPE, SCALER>
	) |
	(
		{
			discrete: false
		} &
		DimensionContinuous<ROW, META, DOMAINTYPE, RANGETYPE, SCALER>
	)

export type ChartBasics<ROW, META> =
	Map2OptionalStore<{
		data: ROW[];
		meta?: META;
		width: number;
		height: number;
		margin?: Sides;
		padding?: Sides;
	}>;

export type Chart<ROW, META, DIMENSIONS extends { [k: string]: Dimension<ROW, META, any, any, any>}> =
	ChartBasics<ROW, META> &
	{
		dimensions?: DIMENSIONS;
	}
