import type { NumberValue, ScaleBand, ScaleLinear } from 'd3-scale';
import type { AccessorInput, DimensionInput, DimensionOutput, InferDomainType, Scaler, StringValue } from './types.js';

export function createChart<
	ROW,

	XACCESSOR extends AccessorInput<ROW, unknown>,
	XORDINAL extends boolean,


	YACCESSOR extends AccessorInput<ROW, unknown>,
	YORDINAL extends boolean,


	ZACCESSOR extends AccessorInput<ROW, unknown>,
	ZORDINAL extends boolean,


	RACCESSOR extends AccessorInput<ROW, unknown>,
	RORDINAL extends boolean,


	XRANGETYPE = number,
	XSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, XRANGETYPE> = (
		XRANGETYPE extends number
			? (
				[XORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, XRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, XRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	YRANGETYPE = number,
	YSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>, YRANGETYPE> = (
		YRANGETYPE extends number
			? (
				[YORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>, YRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>, YRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	ZRANGETYPE = number,
	ZSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>, ZRANGETYPE> = (
		ZRANGETYPE extends number
			? (
				[ZORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>, ZRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>, ZRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	RRANGETYPE = number,
	RSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>, RRANGETYPE> = (
		RRANGETYPE extends number
			? (
				[RORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>, RRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>, RRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
>(props: {
	data: ROW[],
	width: number,
	height: number,
	x: DimensionInput<ROW, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER>,
	y: DimensionInput<ROW, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER>,
	z?: DimensionInput<ROW, ZACCESSOR, ZORDINAL, ZRANGETYPE, ZSCALER>,
	r?: DimensionInput<ROW, RACCESSOR, RORDINAL, RRANGETYPE, RSCALER>,
}) : (
	{
		x: DimensionOutput<ROW, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER>,
		y: DimensionOutput<ROW, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER>,
	} &
	(
		InferDomainType<ROW, ZACCESSOR> extends unknown
			? NonNullable<unknown>
			: {
				z: DimensionOutput<ROW, ZACCESSOR, ZORDINAL, ZRANGETYPE, ZSCALER>,
			}
	) &
	(
		InferDomainType<ROW, RACCESSOR> extends unknown
			? NonNullable<unknown>
			: {
				r: DimensionOutput<ROW, RACCESSOR, RORDINAL, RRANGETYPE, RSCALER>,
			}
	)
)
{
	return null!
}