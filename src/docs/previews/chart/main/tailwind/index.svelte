<script lang="ts">
	import { createChart } from '$lib/index.js';
	import { ascending } from 'd3-array';
	import { scaleBand, scaleLinear } from 'd3-scale';

	type R = { year: string, apples: number, bananas: number, cherries: number, dates: number }
	const data: R[] = [
		{year: '2019', apples: 3840, bananas: 1920, cherries: 960, dates: 400},
		{year: '2018', apples: 1600, bananas: 1440, cherries: 960, dates: 400},
		{year: '2017', apples: 820, bananas: 1000, cherries: 640, dates: 400},
		{year: '2016', apples: 820, bananas: 560, cherries: 720, dates: 400}
	];

	const chart = createChart(
		{
			data,
			width: 100,
			height: 100,
			x: {
				ordinal: true,
				accessor: (row) => row.year,
				sort: ascending,
				range: [1, 599],
				//scaleFactory: ({ domain_d, range_d }) => (scaleBand().domain(domain_d).range(range_d).paddingInner(0.028).round(true))
			},
			y: {
				accessor: (row) => row.apples,
				domain: [0, null],
				range: [1, 399],
				scaleFactory: ({ domain_d, range_d }) => scaleLinear().domain(domain_d).range([...range_d].reverse())
			}
		}
	);

	const { width, height, x: { scaled_d: xGetScaled, scale_d: xGetScale }, y: { scaled_d: yGetScaled, scale_d: yGetScale, range_d: xRange }, data: d } = chart;

	$: console.log('xRange', $xRange, $d);

	/*
	TODO: [y] Y coordinates need to be inverted somewhere.. I think? - e.g. a value of 0 should have a short column not a tall one.
	TODO: [y] Create a vanilla stack chart in layercake and see what the diff is
	TODO: [y] Simplify the scaleFactory prop type such that the syntax help is simpler
	TODO: [y] Should return the scale type
	TODO: [ ] Add option to reverse the range (default to true on the y coordinate)
	TODO: [ ] Work out how to ensure custom scales work easily on ordinal scale factories
	      [ ] Work out if the minimum domain type for all ordinal and all scalar are the same, if so, create two scale types...
	TODO: [ ] Accessors arent typed properly, row is any? strings don't work...?
	TODO: [ ] Use a DIMENSION template argument to group the various configurable aspects of a dimension
	TODO: [ ] Calculate extents in one pass
	TODO: [ ] Simplify types for better use in the create function
	 */
</script>
<div class="w-[600px] h-[400px]">
	<div bind:clientWidth={$width} bind:clientHeight={$height} class="w-full h-full">
		{#if typeof window !== 'undefined'}
			<svg class="w-full h-full">
				{#each data as row, i}
					{@const x = $xGetScaled(row)}
					{@const y0 = $yGetScale(0)}
					{@const y = $yGetScaled(row)}
					{@const w = $xGetScale.bandwidth() }

					<rect x={x} y={y} width={w} height={y0 - y} stroke="green" class="fill-white stroke-magnum-800 stroke-[2px]"/>

				{/each}
			</svg>
		{/if}
	</div>
</div>