import type { NumberValue, ScaleBand, ScaleLinear, ScalePower } from 'd3-scale';
import type {
	AccessorInput,
	AccessorOutput,
	AccessorScaledOutput,
	AreaOutput,
	CompareFunc,
	DimensionInput,
	DimensionOutput,
	DomainAccessorInput,
	DomainInput,
	DomainInputOrdinalFunc,
	DomainInputScalarFunc,
	DomainOutput,
	DomainOutputScalar,
	ExtentsInput,
	ExtentsInputScalar,
	ExtentsOutput,
	ExtentsOutputOrdinal,
	ExtentsOutputScalar,
	InferDomainType,
	Map2OptionalStore,
	Map2Stores,
	MarginInput,
	MarginOutput,
	PaddingInput,
	PaddingOutput,
	RangeInput,
	RangeOutput,
	Scaler,
	ScalerFactory,
	SidesInput,
	SidesOutput,
	StringValue,
} from './types.js';
import { derived, type Readable } from 'svelte/store';
import { constant, createFinderAccessor, makeStore } from './util.js';
import { scaleFactoryBand, scaleFactoryLinear, scaleFactorySqrt } from './scale.js';
import type { XOR } from '../../internal/types.js';


export type DimensionsInput<ROW, META, ACCESSORS extends AccessorInput<ROW>, ORDINALS extends boolean, RANGETYPES, SCALERS extends Scaler<InferDomainType<ROW, ACCESSORS>, RANGETYPES>> = {
	[k in string]: DimensionInput<ROW, META, ACCESSORS, ORDINALS, RANGETYPES, SCALERS>
}

export function createChart2<
	ROW,
	META,

	DIMENSIONS extends {
		[k in string]:
			k extends 'x'
			? never
			: k extends 'y'
				? never
				: DimensionInput<ROW, META, ACCESSORS, ORDINALS, RANGETYPES, SCALERS>
	},


	ACCESSORS extends AccessorInput<ROW>,
	ORDINALS extends boolean,
	RANGETYPES,
	SCALERS extends Scaler<InferDomainType<ROW, ACCESSORS>, RANGETYPES>,

	XACCESSOR extends AccessorInput<ROW>,

	YACCESSOR extends AccessorInput<ROW>,


	XORDINAL extends boolean = false,
	XRANGETYPE = number,
	XSCALER extends Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE> = (
		XRANGETYPE extends number
			? (
				[XORDINAL] extends [true]
					? (
						InferDomainType<ROW, XACCESSOR> extends StringValue
							? Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE> & ScaleBand<InferDomainType<ROW, XACCESSOR>>
							: never
						)
					: (
						InferDomainType<ROW, XACCESSOR> extends NumberValue
							? Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	YORDINAL extends boolean = false,
	YRANGETYPE = number,
	YSCALER extends Scaler<InferDomainType<ROW, YACCESSOR>, YRANGETYPE> = (
		YRANGETYPE extends number
			? (
				[YORDINAL] extends [true]
					? (
						InferDomainType<ROW, YACCESSOR> extends StringValue
							? Scaler<InferDomainType<ROW, YACCESSOR>, YRANGETYPE> & ScaleBand<InferDomainType<ROW, YACCESSOR>>
							: never
						)
					: (
						InferDomainType<ROW, YACCESSOR> extends NumberValue
							? Scaler<InferDomainType<ROW, YACCESSOR>, YRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),

>(
	props: Map2OptionalStore<{
		data: ROW[],
		meta?: META,
		dimensions: {
			x?: DimensionInput<ROW, META, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER>,
			y?: DimensionInput<ROW, META, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER>
		} & DIMENSIONS
	}>
): {
	dims: DIMENSIONS,
} &
Map2Stores<{
	data: ROW[],
	meta: undefined | META,
}> &
	(
		unknown extends META
			? Map2Stores<{
				meta: undefined,
			}>
			: Map2Stores<{
				meta: META,
			}>
		) &
	{
		// { row: ROW[], m: META, a: XACCESSOR, o: XORDINAL, d: InferDomainType<ROW, XACCESSOR>, r: XRANGETYPE, s: XSCALER }
	dimensions: {
		[k in keyof DIMENSIONS | 'x' | 'y']:
			k extends 'x'
			? DimensionOutput<ROW, META, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER> & { o2: XORDINAL }
			: k extends 'y'
			? DimensionOutput<ROW, META, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER> & { o2: YORDINAL }
			:
				DIMENSIONS[k] extends DimensionInput<ROW, META, any, infer ORDINAL, infer RANGETYPE, infer SCALER>
		?  DimensionOutput<ROW, META, DIMENSIONS[k]['accessor'], ORDINAL, RANGETYPE, SCALER> & { r: RANGETYPE }
			//? (
			//	k extends 'x'
			//		? DimensionOutput<ROW, META, DIMENSIONS[k]['accessor'], ORDINAL, RANGETYPE, SCALER>
			//		: DimensionOutput<ROW, META, DIMENSIONS[k]['accessor'], ORDINAL, RANGETYPE, SCALER>
			//	)
			: never;
	},
		y: {
			o: YORDINAL,
			a: YACCESSOR,
			d: InferDomainType<ROW, YACCESSOR>
			r: YRANGETYPE,
			s: YSCALER
		}
}
{
	return null!;
}

export function createChart<
	ROW,
	META,

	XACCESSOR extends AccessorInput<ROW>,
	XORDINAL extends boolean,


	YACCESSOR extends AccessorInput<ROW>,
	YORDINAL extends boolean,


	ZACCESSOR extends AccessorInput<ROW>,
	ZORDINAL extends boolean,


	RACCESSOR extends AccessorInput<ROW>,
	RORDINAL extends boolean,


	XRANGETYPE = number,
	XSCALER extends Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE> = (
		XRANGETYPE extends number
			? (
				[XORDINAL] extends [true]
					? (
						InferDomainType<ROW, XACCESSOR> extends StringValue
							? Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE> & ScaleBand<InferDomainType<ROW, XACCESSOR>>
							: never
						)
					: (
						InferDomainType<ROW, XACCESSOR> extends NumberValue
							? Scaler<InferDomainType<ROW, XACCESSOR>, XRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	YRANGETYPE = number,
	YSCALER extends Scaler<InferDomainType<ROW, YACCESSOR>, YRANGETYPE> = (
		YRANGETYPE extends number
			? (
				[YORDINAL] extends [true]
					? (
						InferDomainType<ROW, YACCESSOR> extends StringValue
							? Scaler<InferDomainType<ROW, YACCESSOR>, YRANGETYPE> & ScaleBand<InferDomainType<ROW, YACCESSOR>>
							: never
						)
					: (
						InferDomainType<ROW, YACCESSOR> extends NumberValue
							? Scaler<InferDomainType<ROW, YACCESSOR>, YRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	ZRANGETYPE = number,
	ZSCALER extends Scaler<InferDomainType<ROW, ZACCESSOR>, ZRANGETYPE> = (
		ZRANGETYPE extends number
			? (
				[ZORDINAL] extends [true]
					? (
						InferDomainType<ROW, ZACCESSOR> extends StringValue
							? Scaler<InferDomainType<ROW, ZACCESSOR>, ZRANGETYPE> & ScaleBand<InferDomainType<ROW, ZACCESSOR>>
							: never
						)
					: (
						InferDomainType<ROW, ZACCESSOR> extends NumberValue
							? Scaler<InferDomainType<ROW, ZACCESSOR>, ZRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	RRANGETYPE = number,
	RSCALER extends Scaler<InferDomainType<ROW, RACCESSOR>, RRANGETYPE> = (
		RRANGETYPE extends number
			? (
				[RORDINAL] extends [true]
					? (
						InferDomainType<ROW, RACCESSOR> extends StringValue
							? Scaler<InferDomainType<ROW, RACCESSOR>, RRANGETYPE> & ScaleBand<InferDomainType<ROW, RACCESSOR>>
							: never
						)
					: (
						InferDomainType<ROW, RACCESSOR> extends NumberValue
							? Scaler<InferDomainType<ROW, RACCESSOR>, RRANGETYPE> & ScalePower<number, number, never>
							: never
						)
				)
			: never
		),
>(props: {
	data: ROW[],
	meta?: META,
	width: number,
	height: number,
	margin?: MarginInput,
	padding?: PaddingInput,
	x: DimensionInput<ROW, META, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER>,
	y: DimensionInput<ROW, META, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER>,
	z?: DimensionInput<ROW, META, ZACCESSOR, ZORDINAL, ZRANGETYPE, ZSCALER>,
	r?: DimensionInput<ROW, META, RACCESSOR, RORDINAL, RRANGETYPE, RSCALER>,
}) : (
	Map2Stores<{
		data: ROW[],
		width: number,
		height: number,
		margin: undefined | MarginInput,
		padding: undefined | MarginInput,
		margin_d: MarginOutput,
		padding_d: PaddingOutput,
		area_d: AreaOutput
	}> &
	(
		unknown extends META
			? NonNullable<unknown>
			: Map2Stores<{
				meta: META,
			}>
		) &
	{
		x: DimensionOutput<ROW, META, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER>,
		y: DimensionOutput<ROW, META, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER>,
	} &
	(
		InferDomainType<ROW, ZACCESSOR> extends unknown
			? NonNullable<unknown>
			: {
				z: DimensionOutput<ROW, META, ZACCESSOR, ZORDINAL, ZRANGETYPE, ZSCALER>,
			}
	) &
	(
		InferDomainType<ROW, RACCESSOR> extends unknown
			? NonNullable<unknown>
			: {
				r: DimensionOutput<ROW, META, RACCESSOR, RORDINAL, RRANGETYPE, RSCALER>,
			}
	)
)
{
	const _data = makeStore(props.data);
	const _meta = makeStore(props.meta);
	const _width = makeStore(props.width);
	const _height = makeStore(props.height);
	const _padding = makeStore(props.padding);
	const _margin = makeStore(props.margin);


	function computeSidesOutput(sides: SidesInput | undefined): SidesOutput {
		if (typeof sides === 'object') {
			return {
				...sides,
				width: sides.left + sides.right,
				height: sides.top + sides.bottom
			}
		}

		return {
			left: sides ?? 0,
			right: sides ?? 0,
			width: (sides ?? 0) * 2,

			top: sides ?? 0,
			bottom: sides ?? 0,
			height: (sides ?? 0) * 2,
		}
	}

	const padding_d = derived(
		_padding, 
		$_padding =>
			computeSidesOutput($_padding)
	);

	const margin_d = derived(
		_margin,
		$_margin =>
			computeSidesOutput($_margin)
	);

	const area_d = derived(
		[_width, _height, margin_d, padding_d],
		([$_width, $_height, $margin_d, $padding_d]) => {
			return {
				width: $_width,
				height: $_height,
				margin: {
					...$margin_d,
					innerWidth: $_width - $margin_d.left - $margin_d.right,
					innerHeight:$_height - $margin_d.top - $margin_d.bottom,
				},
				padding: {
					...$padding_d,
					innerWidth: $_width - $margin_d.left - $margin_d.right - $padding_d.left - $padding_d.right,
					innerHeight:$_height - $margin_d.top - $margin_d.bottom - $padding_d.top - $padding_d.bottom,
				}
			}
		}
	)

	function * createDimension<ROW, META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>>(
		props : Map2OptionalStore<{
			ordinal?: boolean,
			accessor: DomainAccessorInput<ROW, DOMAINTYPE>
			range?: RangeInput<RANGETYPE>,
			reverse?: boolean,
			sort?: CompareFunc<DOMAINTYPE>,
			extents?: ExtentsInput<DOMAINTYPE>,
			extentDefault?: DOMAINTYPE,
			domain?: DomainInput<DOMAINTYPE>,
			scalerFactory?: ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER>,
		}> | undefined,
		defs: {
			extentDefault: DOMAINTYPE,
			scalerFactory: ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER>,
			range: RangeInput<RANGETYPE>,
			reverse: boolean
		}
	): Generator<
		// yield
		Map2Stores<{
			ordinal: boolean,
			extents: undefined | ExtentsInput<DOMAINTYPE>,
			accessor_d: AccessorOutput<ROW, DOMAINTYPE>,
		}>,
		// return
		Map2Stores<{
			ordinal: undefined | boolean,
			accessor: DomainAccessorInput<ROW, DOMAINTYPE>,
			range: undefined | RangeInput<RANGETYPE>,
			reverse: undefined | boolean,
			sort: undefined | CompareFunc<DOMAINTYPE>,
			extents: undefined | ExtentsInput<DOMAINTYPE>,
			extentDefault: undefined | DOMAINTYPE,
			domain: undefined | DomainInput<DOMAINTYPE>,
			scalerFactory: undefined | ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER>,

			accessor_d: AccessorOutput<ROW, DOMAINTYPE>,
			extents_d: ExtentsOutput<DOMAINTYPE>,
			domain_d: DomainOutput<DOMAINTYPE>,
			reverse_d: boolean,
			range_d: RangeOutput<RANGETYPE>,
			scaler_d: SCALER,
			scaled_d: AccessorScaledOutput<ROW, RANGETYPE>
		}> | undefined,
		// receive
		Readable<Set<DOMAINTYPE> | [DOMAINTYPE | null, DOMAINTYPE | null] | undefined>
	> {
		if (!props)
			return undefined;

		const {
			ordinal,
			accessor,
			range,
			reverse,
			sort,
			extents,
			extentDefault,
			domain,
			scalerFactory
		} = props;

		const _accessor = makeStore(accessor);
		const _range = makeStore(range);
		const _reverse = makeStore(reverse);
		const _sort = makeStore(sort);
		const _extents = makeStore(extents);
		const _extentDefault = 'extentDefault' in props
			? makeStore(extentDefault) as Readable<DOMAINTYPE>
			: makeStore(defs.extentDefault);
		const _domain = makeStore(domain);
		const _scalerFactory = makeStore(scalerFactory);

		const accessor_d = derived(
			_accessor,
			($_accessor) => {
				if (typeof $_accessor === 'function')
					return $_accessor
				else
					return (row: ROW) => row[$_accessor] as DOMAINTYPE; // not technically correct, but sufficient
			}
		);

		const extentsFound = yield {
			ordinal: !!ordinal,
			extents: _extents,
			accessor_d
		}

		const extents_d = ordinal
			? extentsFound as Readable<ExtentsOutputOrdinal<DOMAINTYPE>>
			: derived(
				[
					extentsFound as Readable<ExtentsInputScalar<DOMAINTYPE>>,
					_extentDefault
				],
				([$extentsFound, $_extentDefault]) => {
					return [$extentsFound[0] ?? $_extentDefault, $extentsFound[1] ?? $_extentDefault] satisfies ExtentsOutputScalar<DOMAINTYPE>;
				});

		const domain_d = derived(
			[extents_d, _domain, _extentDefault],
			([$extents_d, $_domain, $_extentDefault]) => {
				if (!$_domain)
					return $extents_d as DomainOutput<DOMAINTYPE>;

				if (typeof $_domain === 'function') {
					if (ordinal)
						return ($_domain as DomainInputOrdinalFunc<DOMAINTYPE>)($extents_d as ExtentsOutputOrdinal<DOMAINTYPE>);
					else
						return ($_domain as DomainInputScalarFunc<DOMAINTYPE>)($extents_d as ExtentsOutputScalar<DOMAINTYPE>, $_extentDefault);
				}

				if (ordinal)
					return new Set($_domain as DOMAINTYPE[]);

				return [
					$_domain[0] ?? ($extents_d as ExtentsOutputScalar<DOMAINTYPE>)[0],
					...($_domain.slice(1, -1) as DOMAINTYPE[]),
					$_domain[$_domain.length - 1] ?? ($extents_d as ExtentsOutputScalar<DOMAINTYPE>)[1],
				] as unknown as DomainOutputScalar<DOMAINTYPE>
			}
		);

		const reverse_d = derived(
			_reverse,
			$_reverse =>
				$_reverse ?? defs.reverse
		);

		const range_d = derived(
			[_range, reverse_d],
			([$_range, $_reverse_d], set: (value: RangeOutput<RANGETYPE>) => void) => {

				const range = $_range ?? defs.range;
				const order = <R extends Array<unknown>>(r: R) => ($_reverse_d ? [...r].reverse() : r) as R;

				if (typeof range !== 'function')
					return set(order(range));

				return derived(
					[area_d],
						([$area_d]) =>
							order(range($area_d))
				).subscribe(set)
			}
		);

		const scaler_d = derived(
			[
				_scalerFactory,
				_meta,
				domain_d,
				range_d
			],
			([
				$_scalerFactory,
				$_meta,
				$domain_d,
				$range_d
			 ]) => {
				const factory = $_scalerFactory ?? defs.scalerFactory;

				return factory({
					meta: $_meta as never,
					ordinal: !!ordinal,
					domain_d: $domain_d as never,
					range_d: $range_d
				})
			}
		);

		const scaled_d = derived(
			[accessor_d, scaler_d],
			([$accessor_d, $scaler_d]) => {
				return ((row: ROW) => {
					const value = $accessor_d(row);
					if (Array.isArray(value))
						return value.map(v => $scaler_d(v));
					return $scaler_d(value);
				}) as AccessorScaledOutput<ROW, RANGETYPE>
			}
		);

		return {
			ordinal: true,
			accessor: _accessor,
			range: _range,
			reverse: _reverse,
			sort: _sort,
			extents: _extents,
			extentDefault: _extentDefault,
			domain: _domain,
			scalerFactory: _scalerFactory,
			accessor_d,
			extents_d,
			domain_d,
			reverse_d,
			range_d,
			scaler_d,
			scaled_d
		}
	}

	const genX = createDimension(
		props.x as never,
		{
			extentDefault: 0 as never,
			scalerFactory: (props.x.ordinal ? scaleFactoryBand : scaleFactoryLinear) as never,
			range: ({ width, padding, margin }) => [0, width - padding.left - padding.right - margin.left - margin.right],
			reverse: false
		}
	);
	const genY = createDimension(
		props.y as never,
	{
			extentDefault: 0 as never,
			scalerFactory: (props.y.ordinal ? scaleFactoryBand : scaleFactoryLinear) as never,
			range: ({ height, padding, margin }) => [0, height - padding.top - margin.top - padding.bottom - margin.bottom],
			reverse: true
		}
	);
	const genZ = createDimension(
		props.z as never,
		{
			extentDefault: 0 as never,
			scalerFactory: (props.z?.ordinal ? scaleFactoryBand : scaleFactoryLinear) as never,
			range: ({ width }) => [0, width],
			reverse: false
		}
	);
	const genR = createDimension(
		props.r as never,
		{
			extentDefault: 1 as never,
			scalerFactory: (props.z?.ordinal ? scaleFactoryBand : scaleFactorySqrt) as never,
			range: [1, 25],
			reverse: false
		}
	);

	const pass1X = genX.next().value;
	const pass1Y = genY.next().value;
	const pass1Z = genZ.next().value;
	const pass1R = genR.next().value;

	const xyzrExtents = derived(
		[
			_data,
			pass1X?.accessor_d ?? constant(undefined),
			pass1X?.extents ?? constant(undefined),
			pass1Y?.accessor_d ?? constant(undefined),
			pass1Y?.extents ?? constant(undefined),
			pass1Z?.accessor_d ?? constant(undefined),
			pass1Z?.extents ?? constant(undefined),
			pass1R?.accessor_d ?? constant(undefined),
			pass1R?.extents ?? constant(undefined),
		],
		([
			$_data,
			$_xAccessor,
			$_xExtents,
			$_yAccessor,
			$_yExtents,
			$_zAccessor,
			$_zExtents,
			$_rAccessor,
			$_rExtents,
		 ]) => {
			const finderX = createFinderAccessor(!!pass1X?.ordinal, $_xAccessor, $_xExtents);
			const finderY = createFinderAccessor(!!pass1Y?.ordinal, $_yAccessor, $_yExtents);
			const finderZ = createFinderAccessor(!!pass1Z?.ordinal, $_zAccessor, $_zExtents);
			const finderR = createFinderAccessor(!!pass1R?.ordinal, $_rAccessor, $_rExtents);

			const checkers = [finderX?.check, finderY?.check, finderZ?.check, finderR?.check].filter(check => !!check);

			if (checkers.length !== 0) {
				$_data.forEach(row => {
					checkers.forEach(check => check(row))
				})
			}

			return {
				x: finderX?.found,
				y: finderY?.found,
				z: finderZ?.found,
				r: finderR?.found,
			}
		}
	)

	const pass2X = genX.next(derived(xyzrExtents, $xyzrExtents => $xyzrExtents.x)).value;
	const pass2Y = genY.next(derived(xyzrExtents, $xyzrExtents => $xyzrExtents.y)).value;
	const pass2Z = genZ.next(derived(xyzrExtents, $xyzrExtents => $xyzrExtents.z)).value;
	const pass2R = genR.next(derived(xyzrExtents, $xyzrExtents => $xyzrExtents.r)).value;

	const result = {
		data: _data,
		width: _width,
		height: _height,
		padding: _padding,
		margin: _margin,
		padding_d: padding_d,
		margin_d: margin_d,
		area_d,
		meta: _meta,
		x: pass2X,
		y: pass2Y,
		z: pass2Z,
		r: pass2R
	};

	return result as never;
}