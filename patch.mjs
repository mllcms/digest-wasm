import {readFile, writeFile, unlink} from "fs/promises"

const name = "digest_wasm"
const base = "./dist/lib"

const input = await readFile(`${base}/${name}.js`, "utf8")

const code = input
    .replace(/async function __wbg_load[\s\S]*?(?=function __wbg_get_imports)/, "")
    .replace(/async function __wbg_init[\s\S]*/, "")
    .replace(/ *__wbg_init.__wbindgen_wasm_module = module;[\n\r]*/, "")

const output = `${code}
const __toBinary = (() => {
    const table = new Uint8Array(128);
    for (let i = 0; i < 64; i++) {
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
    }
    return (base64) => {
        const n = base64.length
        const bytes = new Uint8Array((n - (base64[n - 1] === "=") - (base64[n - 2] === "=")) * 3 / 4 | 0);
        let i = 0, j = 0;
        while (i < n) {
            const c0 = table[base64.charCodeAt(i++)], c1 = table[base64.charCodeAt(i++)];
            const c2 = table[base64.charCodeAt(i++)], c3 = table[base64.charCodeAt(i++)];
            bytes[j++] = c0 << 2 | c1 >> 4;
            bytes[j++] = c1 << 4 | c2 >> 2;
            bytes[j++] = c2 << 6 | c3;
        }
        return bytes;
    };
})();

const bytes = __toBinary(${JSON.stringify(await readFile(`${base}/${name}_bg.wasm`, 'base64'))});

initSync(bytes)
`

await writeFile(`${base}/../${name}.js`, output)
const removes = [".gitignore", "README.md", "package.json"]
removes.forEach(async item => await unlink(`${base}/${item}`))