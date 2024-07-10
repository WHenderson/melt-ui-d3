import { type NumberValue, scaleBand, scaleLinear, scaleSqrt } from 'd3-scale';
import type {
	Scaler,
	ScalerFactoryProps,
	ScalerFactoryPropsOrdinal,
	ScalerFactoryPropsScalar,
	StringValue,
} from './types.js';

export function scaleFactoryLinear<DOMAINTYPE extends NumberValue>(
	{
		domain_d,
		range_d
	}: Pick<ScalerFactoryPropsScalar<never, DOMAINTYPE, number>, 'domain_d' | 'range_d'>
) {
	const scale = scaleLinear<number>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}

export function scaleFactoryBand<DOMAINTYPE extends StringValue = string>(
	{
		domain_d,
		range_d
	}: Pick<ScalerFactoryPropsOrdinal<never, DOMAINTYPE, number>, 'domain_d' | 'range_d'>
) {
	const scale = scaleBand<DOMAINTYPE>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}

export function scaleFactorySqrt<DOMAINTYPE extends NumberValue>(
	{
		domain_d,
		range_d
	}: Pick<ScalerFactoryPropsScalar<never, DOMAINTYPE, number>, 'domain_d' | 'range_d'>
) {
	const scale = scaleSqrt<number>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}