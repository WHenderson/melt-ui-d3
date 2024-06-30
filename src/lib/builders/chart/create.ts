import type {
    Accessor,
    AsStores,
    ChartProps,
    DimensionInputOrdinal,
    DimensionInputScalar,
    DimensionOutputOrdinal,
    DimensionOutputScalar,
    DimensionOutputTypeOrdinal,
    DimensionOutputTypeScalar,
    MaybeStore,
    Merge,
    Range,
    ScaleFactoryOrdinal,
    ScaleFactoryScalar,
    ScaleInputsType,
    Scaler,
} from './types.js';
import { derived, type Readable, writable } from 'svelte/store';
import { scaleLinearFactory, scaleSqrtFactory } from './scale.js';

// x ordinal, y ordinal, no z, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>
};

// x ordinal, y ordinal, no z, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y ordinal, no z, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y ordinal, z ordinal, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x ordinal, y ordinal, z ordinal, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y ordinal, z ordinal, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y ordinal, z scalar, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x ordinal, y ordinal, z scalar, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y ordinal, z scalar, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y scalar, no z, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>
};

// x ordinal, y scalar, no z, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y scalar, no z, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y scalar, z ordinal, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x ordinal, y scalar, z ordinal, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y scalar, z ordinal, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y scalar, z scalar, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x ordinal, y scalar, z scalar, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x ordinal, y scalar, z scalar, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y ordinal, no z, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>
};

// x scalar, y ordinal, no z, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y ordinal, no z, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y ordinal, z ordinal, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x scalar, y ordinal, z ordinal, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y ordinal, z ordinal, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y ordinal, z scalar, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x scalar, y ordinal, z scalar, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y ordinal, z scalar, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y scalar, no z, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>
};

// x scalar, y scalar, no z, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y scalar, no z, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y scalar, z ordinal, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x scalar, y scalar, z ordinal, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y scalar, z ordinal, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y scalar, z scalar, no r
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
};

// x scalar, y scalar, z scalar, r ordinal
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// x scalar, y scalar, z scalar, r scalar
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>(props: {
    data: MaybeStore<ROW[]>,
    width: MaybeStore<number>,
    height: MaybeStore<number>,
    x: DimensionInputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionInputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionInputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionInputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
})
: {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: DimensionOutputScalar<ROW, XDOMAINTYPE, XRANGETYPE>,
    y: DimensionOutputScalar<ROW, YDOMAINTYPE, YRANGETYPE>,
    z: DimensionOutputScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>,
    r: DimensionOutputScalar<ROW, RDOMAINTYPE, RRANGETYPE>,
};

// implementation
export function createChart<
    ROW,
    XDOMAINTYPE,
    YDOMAINTYPE,
    ZDOMAINTYPE,
    RDOMAINTYPE,
    XRANGETYPE = number,
    YRANGETYPE = number,
    ZRANGETYPE = number,
    RRANGETYPE = number
>({ data, width, height, x, y, z, r }: ChartProps<ROW, XDOMAINTYPE, YDOMAINTYPE, ZDOMAINTYPE, RDOMAINTYPE, XRANGETYPE, YRANGETYPE, ZRANGETYPE, RRANGETYPE>): {
    data: Readable<ROW[]>,
    width: Readable<number>,
    height: Readable<number>,
    x: AsStores<Merge<
        DimensionOutputTypeOrdinal<ROW, XDOMAINTYPE, XRANGETYPE>,
        DimensionOutputTypeScalar<ROW, XDOMAINTYPE, XRANGETYPE>
    >>
    y: AsStores<Merge<
        DimensionOutputTypeOrdinal<ROW, YDOMAINTYPE, YRANGETYPE>,
        DimensionOutputTypeScalar<ROW, YDOMAINTYPE, YRANGETYPE>
    >>,
    z?: AsStores<Merge<
        DimensionOutputTypeOrdinal<ROW, ZDOMAINTYPE, ZRANGETYPE>,
        DimensionOutputTypeScalar<ROW, ZDOMAINTYPE, ZRANGETYPE>
    >>,
    r?: AsStores<Merge<
        DimensionOutputTypeOrdinal<ROW, RDOMAINTYPE, RRANGETYPE>,
        DimensionOutputTypeScalar<ROW, RDOMAINTYPE, RRANGETYPE>
    >>,
}
{

    const isStore = <TYPE>(maybeStore: TYPE | Readable<TYPE>): maybeStore is Readable<TYPE> => {
        return maybeStore && typeof maybeStore === 'object' && 'subscribe' in maybeStore;
    }

    const makeStore = <TYPE>(maybeStore: TYPE | Readable<TYPE>): Readable<TYPE> => {
        if (isStore(maybeStore)) {
            return maybeStore;
        } else {
            return writable(maybeStore);
        }
    }

    const createDimension = <DOMAINTYPE, RANGETYPE>(dimension: DimensionInputOrdinal<ROW, DOMAINTYPE, RANGETYPE> | DimensionInputScalar<ROW, DOMAINTYPE, RANGETYPE>, def: { range: MaybeStore<[RANGETYPE, RANGETYPE, ...RANGETYPE[]]>, scaleFactory: MaybeStore<ScaleFactoryOrdinal<ROW, DOMAINTYPE, RANGETYPE>> | MaybeStore<ScaleFactoryScalar<ROW, DOMAINTYPE, RANGETYPE>> }) => {
        const ordinal = !!dimension.ordinal;
        const _accessor = makeStore(dimension.accessor);
        const _sort = makeStore('sort' in dimension ? dimension.sort : undefined);
        const _extents = makeStore(dimension.extents);
        const _extentDefault = makeStore('extentDefault' in dimension ? (dimension.extentDefault ?? (0 as DOMAINTYPE)) : undefined);
        const _domain = makeStore(dimension.domain);
        const _range = makeStore(dimension.range);
        const _range_def = makeStore(def.range);
        const _scaleFactory = makeStore(dimension.scaleFactory);
        const _scaleFactory_def = makeStore(def.scaleFactory);

        const accessor_d = derived(_accessor, $_accessor => {
            return typeof $_accessor === 'function'
            ? $_accessor
            : (((row: ROW) => row[$_accessor]) as Accessor<ROW, DOMAINTYPE>)
        });

        const extents_d = derived(
            [_data, accessor_d, _extents, _sort, _extentDefault],
            ([$_data, $_accessor_d, $_extents, $_sort, $_extentDefault]) => {
                if (ordinal) {
                    if ($_extents)
                        return $_extents as DOMAINTYPE[];

                    const unique = new Set<DOMAINTYPE>();
                    for (const row of $_data) {
                        const value = $_accessor_d(row);

                        if (Array.isArray(value)) {
                            value.forEach(value => unique.add(value))
                        }
                        else {
                            unique.add(value);
                        }
                    }

                    const results = [...unique];
                    if ($_sort)
                        results.sort($_sort);

                    return results;
                }
                else {
                    if ($_extents && $_extents[0] !== null && $_extents[1] !== null)
                        return $_extents as [DOMAINTYPE, DOMAINTYPE];

                    let min: number | null = <number | null>null;
                    let max: number | null = <number | null>null;

                    const add = (value: DOMAINTYPE) => {
                        if (typeof value === 'number' && !Number.isNaN(value)) {
                            if (min === null || (value < min!))
                                min = value;
                            if (max === null || (value > max!))
                                max = value;
                        }
                    }

                    for (const row of $_data) {
                        const value = $_accessor_d(row);

                        if (Array.isArray(value)) {
                            value.forEach(add)
                        }
                        else {
                            add(value)
                        }
                    }

                    if (min === null)
                        min = $_extentDefault as number;
                    if (max === null)
                        max = $_extentDefault as number;

                    return [
                        ($_extents && $_extents[0] !== null ? $_extents[0] : min!) as DOMAINTYPE,
                        ($_extents && $_extents[1] !== null ? $_extents[1] : max!) as DOMAINTYPE
                    ] as [DOMAINTYPE, DOMAINTYPE];
                }
            }
        );

        const domain_d = derived(
            [extents_d, _domain],
            ([$extents_d, $_domain]) => {
                if (!$_domain)
                    return $extents_d;

                if (ordinal) {
                    const d = $_domain as DOMAINTYPE[] | ((domain: DOMAINTYPE[]) => DOMAINTYPE[]);
                    const e = $extents_d as DOMAINTYPE[];

                    if (typeof d === 'function')
                        return d(e);

                    return d;
                }
                else {
                    const d = $_domain as [DOMAINTYPE | null, DOMAINTYPE | null, ...DOMAINTYPE[]] | ((domain: [DOMAINTYPE, DOMAINTYPE]) => [DOMAINTYPE, DOMAINTYPE, ...DOMAINTYPE[]]);
                    const e = $extents_d as [DOMAINTYPE, DOMAINTYPE];

                    if (typeof d === 'function')
                        return d(e);

                    return [d[0] ?? e[0], d[1] ?? e[1], ...(d.slice(2) as DOMAINTYPE[])];
                }
            }
        );

        const range_d = derived(
            [_range, _range_def],
            ([$_range, $_range_def], set: (value: Range<RANGETYPE>) => void) => {
                const range = $_range ?? $_range_def;
                if (typeof range === 'function') {
                    return derived(
                        [_width, _height],
                        ([$_width, $_height]) =>
                            range({ width : $_width, height: $_height })
                    ).subscribe(set)
                }
                else
                    return set(range);
            }
        );

        const scale_d = derived(
            [
                _data,
                _width,
                _height,
                _accessor,
                _sort,
                _extents,
                _extentDefault,
                _domain,
                _range,
                accessor_d,
                extents_d,
                domain_d,
                range_d,
                _scaleFactory,
                _scaleFactory_def
            ],
            ([
                 $_data,
                 $_width,
                 $_height,
                 $_accessor,
                 $_sort,
                 $_extents,
                 $_extentDefault,
                 $_domain,
                 $_range,
                 $accessor_d,
                 $extents_d,
                 $domain_d,
                 $range_d,
                 $_scaleFactory, $_scaleFactory_def
             ]) => {
                const props = {
                    data: $_data,
                    width: $_width,
                    height: $_height,
                    ordinal,
                    accessor: $_accessor,
                    sort: $_sort,
                    extents: $_extents,
                    extentDefault: $_extentDefault,
                    domain: $_domain,
                    range: $_range,
                    accessor_d: $accessor_d,
                    extents_d: $extents_d,
                    domain_d: $domain_d,
                    range_d: $range_d,
                } satisfies ScaleInputsType<ROW, DOMAINTYPE, RANGETYPE>;

                return ($_scaleFactory ?? $_scaleFactory_def)(props as any);
            }
        );

        const scaled_d = derived(
            [accessor_d, scale_d],
            ([$accessor_d, $scale_d]) => {
                return ((row: ROW) => {
                    const value = $accessor_d(row);
                    if (Array.isArray(value)) {
                        return value.map(v => $scale_d(v))
                    }
                    else {
                        return $scale_d(value);
                    }
                }) as Scaler<ROW, RANGETYPE>
            }
        )

        return {
            ordinal,
            accessor: _accessor,
            sort: _sort,
            extents: _extents,
            extentDefault: _extentDefault,
            domain: _domain,
            range: _range,
            scaleFactory: _scaleFactory,
            accessor_d: accessor_d,
            extents_d: extents_d,
            domain_d: domain_d,
            range_d: range_d,
            scale_d: scale_d,
            scaled_d: scaled_d
        } satisfies AsStores<Merge<
            DimensionOutputTypeOrdinal<ROW, DOMAINTYPE, RANGETYPE>,
            DimensionOutputTypeScalar<ROW, DOMAINTYPE, RANGETYPE>
        >>
    }

    const _data = makeStore(data);
    const _width = makeStore(width);
    const _height = makeStore(height);

    const _x = createDimension(x, { range: derived(_width, $_width => [0, $_width] as [XRANGETYPE, XRANGETYPE]), scaleFactory: scaleLinearFactory as any });
    const _y = createDimension(y, { range: derived(_height, $_height => [0, $_height] as [YRANGETYPE, YRANGETYPE]), scaleFactory: scaleLinearFactory as any });
    const _z = z ? createDimension(z, { range: derived(_width, $_width => [0, $_width] as [ZRANGETYPE, ZRANGETYPE]), scaleFactory: scaleLinearFactory as any }) : undefined;
    const _r = r ? createDimension(r, { range: [1 as RRANGETYPE, 25 as RRANGETYPE], scaleFactory: scaleSqrtFactory as any}) : undefined;

    return {
        data: _data,
        width: _width,
        height: _height,
        x: _x,
        y: _y,
        z: _z,
        r: _r,
    }
}