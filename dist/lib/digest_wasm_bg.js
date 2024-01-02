let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_0.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_16(arg0, arg1, arg2) {
    wasm.__wbindgen_export_1(arg0, arg1, addHeapObject(arg2));
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export_5(addHeapObject(e));
    }
}
function __wbg_adapter_42(arg0, arg1, arg2, arg3) {
    wasm.__wbindgen_export_6(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
export class Md5 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Md5.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_md5_free(ptr);
    }
    /**
    * @returns {Md5}
    */
    static new() {
        const ret = wasm.md5_new();
        return Md5.__wrap(ret);
    }
    /**
    * @param {string} data
    * @returns {Promise<string>}
    */
    static digest(data) {
        const ptr0 = passStringToWasm0(data, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.md5_digest(ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {Promise<string>}
    */
    static digestU8(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.md5_digestU8(ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {Promise<void>}
    */
    update(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.md5_update(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    finalize() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.md5_finalize(retptr, ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
export class Sha256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Sha256.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sha256_free(ptr);
    }
    /**
    * @returns {Sha256}
    */
    static new() {
        const ret = wasm.sha256_new();
        return Sha256.__wrap(ret);
    }
    /**
    * @param {string} data
    * @returns {Promise<string>}
    */
    static digest(data) {
        const ptr0 = passStringToWasm0(data, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sha256_digest(ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {Promise<string>}
    */
    static digestU8(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sha256_digestU8(ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {Promise<void>}
    */
    update(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sha256_update(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    finalize() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sha256_finalize(retptr, ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
export class Sha512 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Sha512.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sha512_free(ptr);
    }
    /**
    * @returns {Sha512}
    */
    static new() {
        const ret = wasm.sha512_new();
        return Sha512.__wrap(ret);
    }
    /**
    * @param {string} data
    * @returns {Promise<string>}
    */
    static digest(data) {
        const ptr0 = passStringToWasm0(data, wasm.__wbindgen_export_2, wasm.__wbindgen_export_3);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sha512_digest(ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {Promise<string>}
    */
    static digestU8(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sha512_digestU8(ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} data
    * @returns {Promise<void>}
    */
    update(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export_2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sha512_update(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    finalize() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ptr = this.__destroy_into_raw();
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sha512_finalize(retptr, ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
        }
    }
}

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_cb_drop(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbg_queueMicrotask_4d890031a6a5a50c(arg0) {
    queueMicrotask(getObject(arg0));
};

export function __wbg_queueMicrotask_adae4bc085237231(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

export function __wbg_newnoargs_c62ea9419c21fbac(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_call_90c26b09837aba1c() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbg_self_f0e34d89f33b99fd() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_window_d3b084224f4774d7() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_globalThis_9caa27ff917c6860() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_global_35dfdd59a4da3e74() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_call_5da1969d7cd31ccd() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_new_60f57089c7563e81(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_42(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_resolve_6e1c6553a82f85b7(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_then_3ab08cd4fbb91ae9(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_closure_wrapper97(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 33, __wbg_adapter_16);
    return addHeapObject(ret);
};

