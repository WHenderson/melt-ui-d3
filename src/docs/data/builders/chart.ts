import { ATTRS, KBD, PROPS, SEE } from '$docs/constants.js';
import type { APISchema, KeyboardSchema } from '$docs/types.js';
import { builderSchema, elementSchema } from '$docs/utils/index.js';
import type { BuilderData } from './index.js';

const keyboard: KeyboardSchema = [
];

const schemas: APISchema[] = [];

const features = [
	'Supports xxxx',
];

export const chartData: BuilderData = {
	schemas,
	features,
	keyboard,
};