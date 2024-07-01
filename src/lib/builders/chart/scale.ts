import type {Scale, ScaleInputsType,} from "./types.js";
import { type NumberValue, scaleBand, scaleLinear, scaleSqrt } from 'd3-scale';

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

