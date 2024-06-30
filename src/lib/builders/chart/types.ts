import type {Readable} from "svelte/store";

export type ValidKeys<ROW, DOMAINTYPE> = { [k in keyof ROW]: ROW[k] extends DOMAINTYPE ? k : never }[keyof ROW];

export type AccessorOption<ROW, DOMAINTYPE> =
    ValidKeys<ROW, DOMAINTYPE> |
    ValidKeys<ROW, DOMAINTYPE[]> |
    ((row: ROW) => DOMAINTYPE) |
    ((row: ROW) => DOMAINTYPE[]);

export type Accessor<ROW, DOMAINTYPE> =
    ((row: ROW) => DOMAINTYPE) |
    ((row: ROW) => DOMAINTYPE[]);

export type Scale<DOMAINTYPE, RANGETYPE> = {
    (value: DOMAINTYPE): RANGETYPE;
};

export type Scaler<ROW, RANGETYPE> =
    ((row: ROW) => RANGETYPE) |
    ((row: ROW) => RANGETYPE[]);

export interface IScaleRange<RANGETYPE> {
    range(): [RANGETYPE, RANGETYPE, ...RANGETYPE[]];
    range(range: Iterable<RANGETYPE>): this;
}

export interface IScaleDomain<DOMAINTYPE> {
    domain(): DOMAINTYPE[];
    domain(domain: Iterable<DOMAINTYPE>): this;
}

export type Sort<VALUETYPE> = (a: VALUETYPE, b: VALUETYPE) => number;

export type ExtentsOptionOrdinal<DOMAINTYPE> = DOMAINTYPE[];

export type ExtentsOptionScalar<DOMAINTYPE> = [DOMAINTYPE | null, DOMAINTYPE | null];

export type ExtentsOrdinal<DOMAINTYPE> = DOMAINTYPE[];

export type ExtentsScalar<DOMAINTYPE> = [DOMAINTYPE, DOMAINTYPE];

export type DomainOptionOrdinal<DOMAINTYPE> = DOMAINTYPE[] | ((domain: DOMAINTYPE[]) => DOMAINTYPE[]);

export type DomainOptionScalar<DOMAINTYPE> = [DOMAINTYPE | null, DOMAINTYPE | null, ...DOMAINTYPE[]] | ((domain: [DOMAINTYPE, DOMAINTYPE]) => [DOMAINTYPE, DOMAINTYPE, ...DOMAINTYPE[]]);

export type DomainOrdinal<DOMAINTYPE> = DOMAINTYPE[];

export type DomainScalar<DOMAINTYPE> = [DOMAINTYPE, DOMAINTYPE, ...DOMAINTYPE[]];

export type RangeOption<RANGETYPE> = [RANGETYPE, RANGETYPE, ...RANGETYPE[]] | (({ width, height }: { width: number, height: number }) => [RANGETYPE, RANGETYPE, ...RANGETYPE[]]);

export type Range<RANGETYPE> = [RANGETYPE, RANGETYPE, ...RANGETYPE[]];

export type ScaleFactoryOrdinal<ROW, DOMAINTYPE, RANGETYPE> = (
    props: ScaleInputsTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>
) => Scale<DOMAINTYPE, RANGETYPE>;

export type ScaleFactoryScalar<ROW, DOMAINTYPE, RANGETYPE> = (
    props: ScaleInputsTypeScalar<ROW, DOMAINTYPE, RANGETYPE>
) => Scale<DOMAINTYPE, RANGETYPE>;

export type ScaleFactory<ROW, DOMAINTYPE, RANGETYPE> = (
    props: ScaleInputsType<ROW, DOMAINTYPE, RANGETYPE>
) => Scale<DOMAINTYPE, RANGETYPE>;

export type MaybeStore<TYPE> = TYPE | Readable<TYPE>;

export type AsMaybeStores<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : MaybeStore<TYPE[k]> }

export type AsStores<TYPE> = { [k in keyof TYPE] : k extends 'ordinal' ? TYPE[k] : Readable<TYPE[k]> }

export type Merge<O,S> = { [k in keyof O | keyof S]: (k extends keyof O ? O[k] : undefined) | (k extends keyof S ? S[k] : undefined) }

export type Trump<PRIMARY,SECONDARY> = { [k in keyof PRIMARY | keyof SECONDARY]: (k extends keyof PRIMARY ? PRIMARY[k] : undefined) }

export interface DimensionInputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE> {
    ordinal: true,
    accessor: AccessorOption<ROW, DOMAINTYPE>,
    sort?: Sort<DOMAINTYPE>,
    extents?: ExtentsOptionOrdinal<DOMAINTYPE>,
    domain?: DomainOptionOrdinal<DOMAINTYPE>,
    range?: RangeOption<RANGETYPE>,
    scaleFactory?: ScaleFactoryOrdinal<ROW, DOMAINTYPE, RANGETYPE>
}

export interface DimensionInputTypeScalar<ROW, DOMAINTYPE, RANGETYPE> {
    ordinal?: false,
    accessor: AccessorOption<ROW, DOMAINTYPE>,
    extents?: ExtentsOptionScalar<DOMAINTYPE>,
    extentDefault?: DOMAINTYPE,
    domain?: DomainOptionScalar<DOMAINTYPE>,
    range?: RangeOption<RANGETYPE>,
    scaleFactory?: ScaleFactoryScalar<ROW, DOMAINTYPE, RANGETYPE>
}

export interface DimensionDerivedTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE> {
    accessor_d: Accessor<ROW, DOMAINTYPE>,
    extents_d: ExtentsOrdinal<DOMAINTYPE>,
    domain_d: DomainOrdinal<DOMAINTYPE>,
    range_d: Range<RANGETYPE>
    scale_d: Scale<DOMAINTYPE, RANGETYPE>,
    scaled_d: Scaler<ROW, RANGETYPE>,
}

export interface DimensionDerivedTypeScalar<ROW, DOMAINTYPE, RANGETYPE> {
    accessor_d: Accessor<ROW, DOMAINTYPE>,
    extents_d: ExtentsScalar<DOMAINTYPE>,
    domain_d: DomainScalar<DOMAINTYPE>,
    range_d: Range<RANGETYPE>,
    scale_d: Scale<DOMAINTYPE, RANGETYPE>,
    scaled_d: Scaler<ROW, RANGETYPE>,
}

export type DimensionOutputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE> = DimensionInputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE> & DimensionDerivedTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>;

export type DimensionOutputTypeScalar<ROW, DOMAINTYPE, RANGETYPE> = DimensionInputTypeScalar<ROW, DOMAINTYPE, RANGETYPE> & DimensionDerivedTypeScalar<ROW, DOMAINTYPE, RANGETYPE>;

export type DimensionInputOrdinal<ROW, DOMAINTYPE, RANGETYPE> = AsMaybeStores<DimensionInputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>>;

export type DimensionInputScalar<ROW, DOMAINTYPE, RANGETYPE> = AsMaybeStores<DimensionInputTypeScalar<ROW, DOMAINTYPE, RANGETYPE>>;

export type DimensionOutputOrdinal<ROW, DOMAINTYPE, RANGETYPE>  = AsStores<Trump<DimensionOutputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>, DimensionOutputTypeScalar<ROW, DOMAINTYPE, RANGETYPE>>>;

export type DimensionOutputScalar<ROW, DOMAINTYPE, RANGETYPE> = AsStores<Trump<DimensionOutputTypeScalar<ROW, DOMAINTYPE, RANGETYPE>, DimensionOutputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>>>;


export type ScaleInputsKeysOrdinal =
    'ordinal' |
    'accessor' |
    'sort' |
    'extents' |
    'domain' |
    'range' |
    'accessor_d' |
    'extents_d' |
    'domain_d' |
    'range_d';

export type ScaleInputsKeysScalar =
    'ordinal' |
    'accessor' |
    'extents' |
    'extentDefault' |
    'domain' |
    'range' |
    'accessor_d' |
    'extents_d' |
    'domain_d' |
    'range_d'

export type ScaleInputsTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE> =
    {
        data: ROW[],
        width: number,
        height: number,
    } &
    Trump<
        Pick<
            DimensionOutputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>,
            ScaleInputsKeysOrdinal
        >,
        Pick<
            DimensionOutputTypeScalar<ROW, DOMAINTYPE, RANGETYPE>,
            ScaleInputsKeysScalar
        >
    >;

export type ScaleInputsTypeScalar<ROW, DOMAINTYPE, RANGETYPE> =
    {
        data: ROW[],
        width: number,
        height: number,
    } &
    Trump<
        Pick<
            DimensionOutputTypeScalar<ROW, DOMAINTYPE, RANGETYPE>,
            ScaleInputsKeysScalar
        >,
        Pick<
            DimensionOutputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>,
            ScaleInputsKeysOrdinal
        >
    >;

export type ScaleInputsType<ROW, DOMAINTYPE, RANGETYPE> = Omit<ScaleInputsTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE> | ScaleInputsTypeScalar<ROW, DOMAINTYPE, RANGETYPE>, 'ordinal'> & { ordinal: boolean }


export interface ChartProps<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE,
    YRANGETYPE,
    ZRANGETYPE,
    RRANGETYPE
> {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE> | DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE> | DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z?: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE> | DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r?: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE> | DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
}

// TODO: replace { options, derived } with { ..options, ...options_d }