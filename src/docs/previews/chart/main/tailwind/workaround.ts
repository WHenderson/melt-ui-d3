import { createChart } from '$lib/index.js';

type R = { year: string, apples: number, bananas: number, cherries: number, dates: number }
const data: R[] = [
	{year: '2019', apples: 3840, bananas: 1920, cherries: 960, dates: 400},
	{year: '2018', apples: 1600, bananas: 1440, cherries: 960, dates: 400},
	{year: '2017', apples: 820, bananas: 1000, cherries: 640, dates: 400},
	{year: '2016', apples: 820, bananas: 560, cherries: 720, dates: 400}
];

const meta = {
	myMeta: 'hello world'
}

export const chart = createChart({
	data: data,
	meta: meta,
	width: 0,
	height: 0,
	x: {
		ordinal: true,
		accessor: 'year',
	},
	y: {
		accessor: 'apples',
		domain: [0, null]
	}
});

