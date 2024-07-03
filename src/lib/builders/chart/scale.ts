import { type NumberValue, scaleBand, scaleLinear, scaleSqrt } from 'd3-scale';
import type { Scaler, ScalerFactoryProps, ScalerFactoryPropsOrdinal, StringValue } from './types.js';

export function scaleFactoryLinear<DOMAINTYPE extends NumberValue, ROW = unknown>(
	{
		domain_d,
		range_d
	}: ScalerFactoryProps<ROW, DOMAINTYPE, number>
) {
	const scale = scaleLinear<number>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}

export function scaleFactoryBand<DOMAINTYPE extends StringValue = string, ROW = unknown>(
	{
		domain_d,
		range_d
	}: ScalerFactoryPropsOrdinal<ROW, DOMAINTYPE, number>
) {
	const scale = scaleBand<DOMAINTYPE>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}

export function scaleFactorySqrt<DOMAINTYPE extends NumberValue, ROW = unknown>(
	{
		domain_d,
		range_d
	}: ScalerFactoryProps<ROW, DOMAINTYPE, number>
) {
	const scale = scaleSqrt<number>()
		.domain(domain_d)
		.range(range_d);

	return scale as (typeof scale & Scaler<DOMAINTYPE, number>);
}