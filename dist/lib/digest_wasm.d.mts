/* tslint:disable */
/* eslint-disable */
/**
*/
export class Md5 {
  free(): void;
/**
* @returns {Md5}
*/
  static new(): Md5;
/**
* @param {string} data
* @returns {Promise<string>}
*/
  static digest(data: string): Promise<string>;
/**
* @param {Uint8Array} data
* @returns {Promise<string>}
*/
  static digest_u8(data: Uint8Array): Promise<string>;
/**
* @param {Uint8Array} data
* @returns {Promise<void>}
*/
  update(data: Uint8Array): Promise<void>;
/**
* @returns {string}
*/
  finalize(): string;
}
/**
*/
export class Sha256 {
  free(): void;
/**
* @returns {Sha256}
*/
  static new(): Sha256;
/**
* @param {string} data
* @returns {Promise<string>}
*/
  static digest(data: string): Promise<string>;
/**
* @param {Uint8Array} data
* @returns {Promise<string>}
*/
  static digest_u8(data: Uint8Array): Promise<string>;
/**
* @param {Uint8Array} data
* @returns {Promise<void>}
*/
  update(data: Uint8Array): Promise<void>;
/**
* @returns {string}
*/
  finalize(): string;
}
/**
*/
export class Sha512 {
  free(): void;
/**
* @returns {Sha512}
*/
  static new(): Sha512;
/**
* @param {string} data
* @returns {Promise<string>}
*/
  static digest(data: string): Promise<string>;
/**
* @param {Uint8Array} data
* @returns {Promise<string>}
*/
  static digest_u8(data: Uint8Array): Promise<string>;
/**
* @param {Uint8Array} data
* @returns {Promise<void>}
*/
  update(data: Uint8Array): Promise<void>;
/**
* @returns {string}
*/
  finalize(): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_md5_free: (a: number) => void;
  readonly md5_new: () => number;
  readonly md5_digest: (a: number, b: number) => number;
  readonly md5_digest_u8: (a: number, b: number) => number;
  readonly md5_update: (a: number, b: number, c: number) => number;
  readonly md5_finalize: (a: number, b: number) => void;
  readonly __wbg_sha256_free: (a: number) => void;
  readonly sha256_new: () => number;
  readonly sha256_digest: (a: number, b: number) => number;
  readonly sha256_digest_u8: (a: number, b: number) => number;
  readonly sha256_update: (a: number, b: number, c: number) => number;
  readonly sha256_finalize: (a: number, b: number) => void;
  readonly __wbg_sha512_free: (a: number) => void;
  readonly sha512_new: () => number;
  readonly sha512_digest: (a: number, b: number) => number;
  readonly sha512_digest_u8: (a: number, b: number) => number;
  readonly sha512_update: (a: number, b: number, c: number) => number;
  readonly sha512_finalize: (a: number, b: number) => void;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_export_1: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_2: (a: number, b: number) => number;
  readonly __wbindgen_export_3: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_4: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_5: (a: number) => void;
  readonly __wbindgen_export_6: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
