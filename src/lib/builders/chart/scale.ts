import type {Scale, ScaleInputsType,} from "./types.js";
import {type NumberValue, scaleLinear, scaleSqrt} from "d3-scale";

export function scaleLinearFactory<DOMAINTYPE extends NumberValue>(
    {
        domain_d,
        range_d
    }: ScaleInputsType<any, DOMAINTYPE, number>
): Scale<DOMAINTYPE, number> {
    return scaleLinear()
        .domain(domain_d)
        .range(range_d)
}

export function scaleSqrtFactory<DOMAINTYPE extends NumberValue>(
    {
        domain_d,
        range_d
    }: ScaleInputsType<any, DOMAINTYPE, number>
): Scale<DOMAINTYPE, number> {
    return scaleSqrt()
        .domain(domain_d)
        .range(range_d)
}

