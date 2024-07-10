type OorS<ORDINAL extends boolean, O, S> = [ORDINAL] extends [true] ? O : S;

type Dimension<ROW, ORDINAL extends boolean, DOMAINTYPE, RANGETYPE> = {
	accessor: keyof ROW | ((row: ROW) => DOMAINTYPE)
	//domain?: DOMAINTYPE[] | ((extents: DOMAINTYPE[]) => DOMAINTYPE[]) | [DOMAINTYPE | null, DOMAINTYPE | null] | ((extents: [DOMAINTYPE | null, DOMAINTYPE | null], def: DOMAINTYPE) => [DOMAINTYPE, DOMAINTYPE])
	domain?: OorS<
		ORDINAL,
		DOMAINTYPE[] | ((extents: DOMAINTYPE[]) => DOMAINTYPE[]),
		[DOMAINTYPE | null, DOMAINTYPE | null] | ((extents: [DOMAINTYPE | null, DOMAINTYPE | null], def: DOMAINTYPE) => [DOMAINTYPE, DOMAINTYPE])
	>
}

declare function create<
	ROW
>(props: {
	data: ROW[]
}): {
	data: ROW[],
	dimensions: {},
	dimension: (<THIS extends { dimensions: {} }, NAME extends string, DIMENSION extends Dimension<ROW, ORDINAL, DOMAINTYPE, RANGETYPE>, ORDINAL extends boolean, DOMAINTYPE, RANGETYPE>(
		this: THIS,
		name: NAME,
		ordinal: ORDINAL,
		props: DIMENSION
	) => THIS & { dimensions: { [k in NAME]: DIMENSION & { ordinal: ORDINAL }} })
}

const data = [
	{ y: '1', a: 1 },
	{ y: '2', a: 2 }
];

const r = create({ data })
	.dimension('x', true, { accessor: 'y', domain: ['x','y','z'] })
	.dimension('y', false, { accessor: 'a'})
	.dimension('z', false, { accessor: (row) => row.y })
;

const { x, y, z } = r.dimensions;

declare function createFully<
	ROW,
	DIMENSIONS extends {
		[k in string]: Dimension<ROW, any, any, any>
	}
>(
	props: {
		data: ROW[],
		dimensions: DIMENSIONS
	}
): { data: ROW[], dimensions: DIMENSIONS };

const r2 = createFully(r);

const { x: x2, y: y2, z: z2 } = r2.dimensions;