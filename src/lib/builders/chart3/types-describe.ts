import type {
	Accessor, DomainContinuous,
	DomainDiscrete, ExtentsContinuous, ExtentsContinuousBound,
	ExtentsDiscrete,
	Range,
	Reverse,
	Scaler, ScalerFactoryContinuous, ScalerFactoryDiscrete,
	Sides,
	SortFunc,
} from './types-basic.js';

export type ChartBasics<ROW, META> = {
	data: ROW[];
	meta?: META;
	width: number;
	height: number;
	margin?: Sides;
	padding?: Sides;
}

export type DimensionBasic<ROW, META, DOMAINTYPE, RANGETYPE> = {
	accessor: Accessor<ROW, META, DOMAINTYPE>;
	range?: Range<RANGETYPE, META>;
	reverse?: Reverse<META>;
};

export type DimensionDiscretePartial<META, DOMAINTYPE extends DOMAINSIMPLETYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>> =
	{
		range?: Range<RANGETYPE, META>;
		reverse?: Reverse<META>;
		extents?: ExtentsDiscrete<DOMAINTYPE, META>;
		domain?: DomainDiscrete<DOMAINTYPE, META>;
		sort?: SortFunc<DOMAINTYPE>;
		scalerFactory?: ScalerFactoryDiscrete<DOMAINSIMPLETYPE, RANGETYPE, META, SCALER>;
	}

export type DimensionDiscrete<ROW, META, DOMAINTYPE extends DOMAINSIMPLETYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>> =
	{
		discrete: true;
		accessor: Accessor<ROW, META, DOMAINTYPE>;
		range?: Range<RANGETYPE, META>;
		reverse?: Reverse<META>;
		extents?: ExtentsDiscrete<DOMAINTYPE, META>;
		domain?: DomainDiscrete<DOMAINTYPE, META>;
		sort?: SortFunc<DOMAINTYPE>;
		scalerFactory: ScalerFactoryDiscrete<DOMAINSIMPLETYPE, RANGETYPE, META, SCALER>;
	}

export type DimensionContinuousPartial<META, DOMAINTYPE extends DOMAINSIMPLETYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>> =
	{
		range?: Range<RANGETYPE, META>;
		reverse?: Reverse<META>;
		extents?: ExtentsContinuous<DOMAINTYPE, META>;
		extentsDefault?: ExtentsContinuousBound<DOMAINTYPE>;
		domain?: DomainContinuous<DOMAINTYPE, META>;
		scalerFactory: ScalerFactoryContinuous<DOMAINSIMPLETYPE, RANGETYPE, META, SCALER>;
	}

export type DimensionContinuous<ROW, META, DOMAINTYPE extends DOMAINSIMPLETYPE, RANGETYPE, DOMAINSIMPLETYPE, SCALER extends Scaler<DOMAINSIMPLETYPE, RANGETYPE>> =
	{
		discrete?: false;
		accessor: Accessor<ROW, META, DOMAINTYPE>;
		range?: Range<RANGETYPE, META>;
		reverse?: Reverse<META>;
		extents?: ExtentsContinuous<DOMAINTYPE, META>;
		extentsDefault?: ExtentsContinuousBound<DOMAINTYPE>;
		domain?: DomainContinuous<DOMAINTYPE, META>;
		scalerFactory: ScalerFactoryContinuous<DOMAINSIMPLETYPE, RANGETYPE, META, SCALER>;
	}
