<script lang="ts">
	import { createChart, melt, type ScaleInputsType, type ScaleInputsTypeOrdinal } from '$lib/index.js';
	import { ascending } from 'd3-array';
	import { scaleBand } from 'd3-scale';

	const data = [
		{year: '2019', apples: 3840, bananas: 1920, cherries: 960, dates: 400},
		{year: '2018', apples: 1600, bananas: 1440, cherries: 960, dates: 400},
		{year: '2017', apples: 820, bananas: 1000, cherries: 640, dates: 400},
		{year: '2016', apples: 0, bananas: 560, cherries: 720, dates: 400}
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
				scaleFactory: ({ domain_d, range_d }: ScaleInputsTypeOrdinal<never, string, number>) => scaleBand().domain(domain_d).range(range_d)
			},
			y: {
				accessor: (row) => row.apples
			}
		}
	);

	const { width, height, x: { scaled_d: getX, scale_d: scaleX }, y: { scaled_d: getY, scale_d: scaleY } } = chart;

	/*
	TODO: Y coordinates need to be inverted somewhere.. I think? - e.g. a value of 0 should have a short column not a tall one.
	TODO: Create a vanilla stack chart in layercake and see what the diff is
	 */
</script>
<div class="w-[600px] h-[400px]">
	<div bind:clientWidth={$width} bind:clientHeight={$height} class="w-full h-full  border border-green-300">
		{#if typeof window !== 'undefined'}
			<svg class="w-full h-full">
				{#each data as row, i}
					{@const x = $getX(row)}
					{@const y0 = $scaleY(0)}
					{@const y = $getY(row)}
					{@const w = $scaleX.bandwidth() }
					{@html `!<-- ${JSON.stringify({ y0, y })} -->`}

					<circle r={5} cx={x} cy={y} />

					<rect x={x} y={y} width={w} height={y - y0} stroke="green" stroke-width="1" fill="pink"/>

				{/each}
			</svg>
		{/if}
	</div>
</div>