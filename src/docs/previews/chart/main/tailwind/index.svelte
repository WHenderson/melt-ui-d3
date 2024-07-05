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
		padding: 10,
		margin: 20,
		x: {
			ordinal: true,
			accessor: 'year',
		},
		y: {
			accessor: 'apples',
			domain: [0, null]
		}
	});

	const { data, width, height, padding_d, margin_d, x: { accessor_d: xAccessorD, scaled_d: xGetScaled, scaler_d: xGetScaler }, y: { scaled_d: yGetScaled, scaler_d: yGetScaler, range_d: xRange }, data: d } = chart;

	$: console.log('info', $data, $xGetScaler);

	/**
	 * TODO:
	 *  Add margins and padd, use g and transform to place into correct location...
	 */
</script>
<div class="w-[600px] h-[400px]">
	<div bind:clientWidth={$width} bind:clientHeight={$height} class="w-full h-full">
			{#if typeof window !== 'undefined'}
				<svg class="w-full h-full">
					<rect x={0} y={0} width={$width} height={$height} stroke="blue" fill="none" />
					<rect x={$margin_d.left} y={$margin_d.top} width={$width - $margin_d.left - $margin_d.right} height={$height - $margin_d.top - $margin_d.bottom} stroke="blue" fill="none" />
					<rect x={$margin_d.left + $padding_d.left} y={$margin_d.top + $padding_d.top} width={$width - $margin_d.left - $margin_d.right - $padding_d.left - $padding_d.right} height={$height - $margin_d.top - $margin_d.bottom - $padding_d.left - $padding_d.right} stroke="blue" fill="none" />

					<g transform="translate({$margin_d.left + $padding_d.left}, {$margin_d.top + $padding_d.top})">
						{#each $data as row, i}
							{@const x = $xGetScaled(row)}
							{@const y0 = $yGetScaler(0)}
							{@const y = $yGetScaled(row)}
							{@const w = $xGetScaler.bandwidth() }

							<rect x={x} y={y} width={w} height={y0 - y} stroke="green" class="fill-white stroke-magnum-800 stroke-[2px]"/>
						{/each}
					</g>
				</svg>
			{/if}
		</div>
</div>