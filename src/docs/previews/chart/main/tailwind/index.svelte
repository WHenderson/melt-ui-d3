<script lang="ts">
	import { createChart } from '$lib/index.js';

	type R = { year: string, apples: number, bananas: number, cherries: number, dates: number }
	const rdata: R[] = [
		{year: '2019', apples: 3840, bananas: 1920, cherries: 960, dates: 400},
		{year: '2018', apples: 1600, bananas: 1440, cherries: 960, dates: 400},
		{year: '2017', apples: 820, bananas: 1000, cherries: 640, dates: 400},
		{year: '2016', apples: 820, bananas: 560, cherries: 720, dates: 400}
	];

	const meta = {
		myMeta: 'hello world'
	}

	export const chart = createChart({
		data: rdata,
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

	const { data, width, height, x: { accessor_d: xAccessorD, scaled_d: xGetScaled, scaler_d: xGetScaler }, y: { scaled_d: yGetScaled, scaler_d: yGetScaler, range_d: xRange }, data: d } = chart;

	$: console.log('info', $data, $xGetScaler);
</script>
<div class="w-[600px] h-[400px]">
	<div bind:clientWidth={$width} bind:clientHeight={$height} class="w-full h-full">
			{#if typeof window !== 'undefined'}
				<svg class="w-full h-full">
					{#each $data as row, i}
						{@const x = $xGetScaled(row)}
						{@const y0 = $yGetScaler(0)}
						{@const y = $yGetScaled(row)}
						{@const w = $xGetScaler.bandwidth() }

						<rect x={x} y={y} width={w} height={y0 - y} stroke="green" class="fill-white stroke-magnum-800 stroke-[2px]"/>
					{/each}
				</svg>
			{/if}
		</div>
</div>