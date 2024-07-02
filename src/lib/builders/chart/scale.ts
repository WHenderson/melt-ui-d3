import type {Scale, ScaleInputsType,} from "./types.js";
import {
  type NumberValue,
  scaleBand,
  scaleDiverging,
  scaleDivergingLog,
  scaleDivergingPow,
  scaleDivergingSqrt,
  scaleDivergingSymlog,
  scaleImplicit,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scalePoint,
  scalePow, scaleQuantile, scaleQuantize,
  scaleSequential,
  scaleSqrt,
  scaleSymlog, scaleThreshold,
  scaleTime,
} from 'd3-scale';

export function scaleLinearFactory<DOMAINTYPE extends NumberValue>(
    {
        domain_d,
        range_d
    }: ScaleInputsType<any, DOMAINTYPE, number>
) {
    return scaleLinear<number>()
        .domain(domain_d)
        .range(range_d)
}

export function scaleBandFactory<DOMAINTYPE extends { toString(): string } = string>(
  {
    domain_d,
    range_d
  }: ScaleInputsType<any, DOMAINTYPE, number>
) {
  return scaleBand<DOMAINTYPE>()
    .domain(domain_d)
    .range(range_d)
}

export function scaleSqrtFactory<DOMAINTYPE extends NumberValue>(
    {
        domain_d,
        range_d
    }: ScaleInputsType<any, DOMAINTYPE, number>
) {
    return scaleSqrt<number>()
        .domain(domain_d)
        .range(range_d)
}

/**
 * scaleLinear, NumberValue, any = number
 * scaleTime, Date | NumberValue, any = number
 * scalePow, NumberValue, any = number
 * scaleSqrt, NumberValue, any = number
 * scaleLog, NumberValue, any = number
 * scaleSymlog, NumberValue, any = number
 * scaleSequential, NumberValue, any = number
 * scaleDiverging, NumberValue, any = number
 * scaleDivergingLog, NumberValue, any = number
 * scaleDivergingPow, NumberValue, any = number
 * scaleDivergingSymlog, NumberValue, any = number
 * scaleDivergingSqrt, NumberValue, any = number
 * scaleQuantile, NumberValue, any = number
 * scaleQuantize, NumberValue, any = number
 * scaleThreshold, extends number | string | Date = number, any = number
 *
 * scaleOrdinal, extends { toString(): string }, any
 * scaleBand, extends { toString(): string } = string, number | undefined
 * scalePoint, extends { toString(): string } = string, number | undefined;
 *
 **/

scaleThreshold()
