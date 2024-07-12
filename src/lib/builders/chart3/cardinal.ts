import { scalerFactoryBand, scalerFactoryLinear } from './scale.js';
import type { Area } from './types-basic.js';

export const h_range = ({ area }: { area: Area}) => [0, area.padding.inner.width] as [number, number];

export const h_discrete = {
	range: h_range,
	scalerFactory: scalerFactoryBand
}

export const h_continuous = {
	range: h_range,
	scalerFactory: scalerFactoryLinear
}

export const v_range = ({ area }: { area: Area}) => [0, area.padding.inner.height] as [number, number];

export const v_discrete = {
	range: v_range,
	scalerFactory: scalerFactoryBand
}

export const v_continuous = {
	range: v_range,
	scalerFactory: scalerFactoryLinear
}
