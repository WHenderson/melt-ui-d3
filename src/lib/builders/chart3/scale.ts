import { type NumberValue, scaleBand, scaleLinear, scaleSqrt } from 'd3-scale';
import type { DomainContinuousBound, DomainDiscreteSet, RangeList, Scaler } from './types-basic.js';
import type { StringValue } from './types-util.js';

export function scalerFactoryBand<DOMAINTYPE extends StringValue = string>(
	{
		domain_d,
		range_d
	}: {
		domain_d: DomainDiscreteSet<DOMAINTYPE>,
		range_d: RangeList<number>
	}
) {
	const scale = scaleBand<DOMAINTYPE>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}
export function scalerFactoryLinear<DOMAINTYPE extends NumberValue>(
	{
		domain_d,
		range_d
	}: {
		domain_d: DomainContinuousBound<DOMAINTYPE>,
		range_d: RangeList<number>
	}
) {
	const scale = scaleLinear<number>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}

export function scalerFactorySqrt<DOMAINTYPE extends NumberValue>(
	{
		domain_d,
		range_d
	}: {
		domain_d: DomainContinuousBound<DOMAINTYPE>,
		range_d: RangeList<number>
	}
) {
	const scale = scaleSqrt<number>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}