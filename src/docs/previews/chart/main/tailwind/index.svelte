<script lang="ts">
	import { chart } from './workaround.js';

	const { data, width, height, x: { scaled_d: xGetScaled, scaler_d: xGetScaler }, y: { scaled_d: yGetScaled, scaler_d: yGetScaler, range_d: xRange }, data: d } = chart;

	$: console.log('info', $data, $xGetScaler);

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