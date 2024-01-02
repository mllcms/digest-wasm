# DigestWasm

基于 RustCrypto 库编译而成的 wasm 哈希库

用于提高 Md5 Sha256 Sha512 等计算速度

**[WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)**

**[测试地址](https://mllcms.github.io/digest-wasm/)**

## Install

```sh
pnpm install digest-wasm
```

## Usage

### 正常使用

```js
import {Md5, Sha256, Sha512} from "digest-wasm";

const md5 = await Md5.digest("Hello World!")
const sha256 = await Sha256.digest("Hello World!")
const sha512 = await Sha512.digest("Hello World!")
```

```js
const buffer = await new Blob(["Hello World!"]).arrayBuffer()
const md5 = await Md5.digest_u8(new Uint8Array(buffer))
const sha256 = await Sha256.digest_u8(new Uint8Array(buffer))
const sha512 = await Sha512.digest_u8(new Uint8Array(buffer))
```

### 增量计算

```js
import init, {Md5, Sha256, Sha512} from "digest-wasm";

const file_hash = async (file, chunkSize = 128 << 20) => {
    const hash = Md5.new()
    // const hash = Sha256.new()
    // const hash = Sha512.new()

    for (let i = 0; i < Math.ceil(file.size / chunkSize); i++) {
        const chuck = await file.slice(chunkSize * i, chunkSize * (i + 1)).arrayBuffer()
        await ctx.update(new Uint8Array(chuck))
    }

    return ctx.finalize()
}
```