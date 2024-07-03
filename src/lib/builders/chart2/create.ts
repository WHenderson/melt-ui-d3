import type { NumberValue, ScaleBand, ScaleLinear } from 'd3-scale';
import type {
	AccessorInput,
	AccessorOutput,
	AccessorScaledOutput,
	CompareFunc,
	DimensionInput,
	DimensionOutput,
	DomainInput,
	DomainInputOrdinal,
	DomainInputOrdinalFunc,
	DomainInputScalarFunc,
	DomainOutput,
	DomainOutputOrdinal,
	DomainOutputScalar,
	ExtentsInput,
	ExtentsInputOrdinal,
	ExtentsInputScalar,
	ExtentsOutput,
	ExtentsOutputOrdinal,
	ExtentsOutputScalar,
	InferAccessorOutput,
	InferDomainType,
	Map2OptionalStore,
	Map2Stores,
	OptionalStore,
	RangeInput,
	RangeOutput,
	Scaler,
	ScalerFactory,
	ScalerFactoryOrdinal,
	StringValue,
} from './types.js';
import { derived, type Readable, writable } from 'svelte/store';
import { constant, createFinder, createFinderAccessor, makeStore } from './util.js';
import { scaleFactoryLinear, scaleFactorySqrt } from './scale.js';


type DimensionSimpleInput<
	ROW,
	META,
	DOMAINTYPE,
	RANGETYPE,
	SCALER extends Scaler<DOMAINTYPE, RANGETYPE>
> = Map2OptionalStore<{
	ordinal?: boolean,
	accessor: AccessorInput<ROW, DOMAINTYPE>,
	range?: RangeInput<RANGETYPE>,
	reverse?: boolean,
	sort?: CompareFunc<DOMAINTYPE>,
	extents?: ExtentsInputOrdinal<DOMAINTYPE>,
	extentDefault?: DOMAINTYPE,
	domain?: DomainInputOrdinal<DOMAINTYPE>,
	scalerFactory?: ScalerFactoryOrdinal<META, DOMAINTYPE, RANGETYPE, SCALER>,
}>

type DimensionSimpleOutput<
	ROW,
	META,
	DOMAINTYPE,
	RANGETYPE,
	SCALER extends Scaler<DOMAINTYPE, RANGETYPE>
> = Map2Stores<{
	ordinal: undefined | boolean,
	accessor: AccessorInput<ROW, DOMAINTYPE>,
	range: undefined | RangeInput<RANGETYPE>,
	reverse: undefined | boolean,
	sort: undefined | CompareFunc<DOMAINTYPE>,
	extents: undefined | ExtentsInput<DOMAINTYPE>,
	extentDefault: undefined | DOMAINTYPE,
	domain: undefined | DomainInput<DOMAINTYPE>,
	scalerFactory: undefined | ScalerFactory<META, DOMAINTYPE, RANGETYPE, SCALER>,

	accessor_d: AccessorOutput<ROW, DOMAINTYPE>
}>


export function createChart<
	ROW,
	META,

	XACCESSOR extends AccessorInput<ROW, unknown>,
	XORDINAL extends boolean,


	YACCESSOR extends AccessorInput<ROW, unknown>,
	YORDINAL extends boolean,


	ZACCESSOR extends AccessorInput<ROW, unknown>,
	ZORDINAL extends boolean,


	RACCESSOR extends AccessorInput<ROW, unknown>,
	RORDINAL extends boolean,


	XRANGETYPE = number,
	XSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, XRANGETYPE> = (
		XRANGETYPE extends number
			? (
				[XORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, XRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<XACCESSOR>>, XRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	YRANGETYPE = number,
	YSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>, YRANGETYPE> = (
		YRANGETYPE extends number
			? (
				[YORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>, YRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<YACCESSOR>>, YRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	ZRANGETYPE = number,
	ZSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>, ZRANGETYPE> = (
		ZRANGETYPE extends number
			? (
				[ZORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>, ZRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<ZACCESSOR>>, ZRANGETYPE> & ScaleLinear<number, number, never>
							: never
						)
				)
			: never
		),
	RRANGETYPE = number,
	RSCALER extends Scaler<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>, RRANGETYPE> = (
		RRANGETYPE extends number
			? (
				[RORDINAL] extends [true]
					? (
						InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>> extends StringValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>, RRANGETYPE> & ScaleBand<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>>
							: never
						)
					: (
						InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>> extends NumberValue
							? Scaler<InferDomainType<NoInfer<ROW>, NoInfer<RACCESSOR>>, RRANGETYPE> & ScaleLinear<number, number, never>
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
	x: DimensionInput<ROW, NoInfer<META>, XACCESSOR, XORDINAL, XRANGETYPE, XSCALER>,
	y: DimensionInput<ROW, NoInfer<META>, YACCESSOR, YORDINAL, YRANGETYPE, YSCALER>,
	z?: DimensionInput<ROW, NoInfer<META>, ZACCESSOR, ZORDINAL, ZRANGETYPE, ZSCALER>,
	r?: DimensionInput<ROW, NoInfer<META>, RACCESSOR, RORDINAL, RRANGETYPE, RSCALER>,
}) : (
	Map2Stores<{
		data: ROW[],
		width: number,
		height: number,
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
)/*;

export function createChart<
	ROW,
	META,

	XDOMAINTYPE,
	XORDINAL extends boolean,
	XRANGETYPE,
	XSCALER extends Scaler<XDOMAINTYPE, XRANGETYPE>,

	YDOMAINTYPE,
	YORDINAL extends boolean,
	YRANGETYPE,
	YSCALER extends Scaler<YDOMAINTYPE, YRANGETYPE>,

	ZDOMAINTYPE,
	ZORDINAL extends boolean,
	ZRANGETYPE,
	ZSCALER extends Scaler<ZDOMAINTYPE, ZRANGETYPE>,

	RDOMAINTYPE,
	RORDINAL extends boolean,
	RRANGETYPE,
	RSCALER extends Scaler<RDOMAINTYPE, RRANGETYPE>,
>(props: {
	data: OptionalStore<ROW[]>,
	meta?: OptionalStore<META>,
	width: OptionalStore<number>,
	height: OptionalStore<number>,
	x: DimensionSimpleInput<ROW, META, XDOMAINTYPE, XRANGETYPE, XSCALER>,
	y: DimensionSimpleInput<ROW, META, YDOMAINTYPE, YRANGETYPE, YSCALER>,
	z?: DimensionSimpleInput<ROW, META, ZDOMAINTYPE, ZRANGETYPE, ZSCALER>,
	r?: DimensionSimpleInput<ROW, META, RDOMAINTYPE, RRANGETYPE, RSCALER>,
}) : {
	data: Readable<ROW[]>,
	meta?: Readable<META>,
	width: Readable<number>,
	height: Readable<number>,
	x: DimensionSimpleOutput<ROW, META, XDOMAINTYPE, XRANGETYPE, XSCALER>,
	y: DimensionSimpleOutput<ROW, META, XDOMAINTYPE, XRANGETYPE, XSCALER>,
	z?: DimensionSimpleOutput<ROW, META, XDOMAINTYPE, XRANGETYPE, XSCALER>,
	r?: DimensionSimpleOutput<ROW, META, XDOMAINTYPE, XRANGETYPE, XSCALER>,
}
*/
{
	const _data = makeStore(props.data);
	const _meta = makeStore(props.meta);
	const _width = makeStore(props.width);
	const _height = makeStore(props.height);

	function * createDimension<ROW, META, DOMAINTYPE, RANGETYPE, SCALER extends Scaler<DOMAINTYPE, RANGETYPE>>(
		props : Map2OptionalStore<{
			ordinal?: boolean,
			accessor: AccessorInput<ROW, DOMAINTYPE>
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
			range: RangeInput<RANGETYPE>
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
			accessor: AccessorInput<ROW, DOMAINTYPE>,
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

		const range_d = derived(
			_range,
			($_range, set: (value: RangeOutput<RANGETYPE>) => void) => {
				const range = $_range ?? defs.range;
				if (typeof range !== 'function')
					return set(range);

				return derived(
					[_width, _height],
						([$_width, $_height]) =>
							range({ width: $_width, height: $_height })
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
			range_d,
			scaler_d,
			scaled_d
		}
	}

	const genX = createDimension(
		props.x as never,
		{
			extentDefault: 0 as never,
			scalerFactory: scaleFactoryLinear,
			range: ({ width }) => [0, width]
		}
	);
	const genY = createDimension(
		props.y as never,
	{
			extentDefault: 0 as never,
			scalerFactory: scaleFactoryLinear,
			range: ({ height }) => [0, height]
		}
	);
	const genZ = createDimension(
		props.z as never,
		{
			extentDefault: 0 as never,
			scalerFactory: scaleFactoryLinear,
			range: ({ width }) => [0, width]
		}
	);
	const genR = createDimension(
		props.r as never,
		{
			extentDefault: 1 as never,
			scalerFactory: scaleFactorySqrt,
			range: [1, 25]
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
		meta: _meta,
		x: pass2X,
		y: pass2Y,
		z: pass2Z,
		r: pass2R
	};

	return result as never;
}