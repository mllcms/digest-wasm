import {Md5, Sha256, Sha512} from "digest-wasm"
import {readFile} from "fs/promises"

const data = await readFile("../LICENSE")

const md5 = await Md5.digest_u8(new Uint8Array(data))
console.assert(md5 === "d229da563da18fe5d58cd95a6467d584", "MD5 计算结果不正确")

const sha256 = await Sha256.digest_u8(new Uint8Array(data))
console.assert(sha256 === "1eb85fc97224598dad1852b5d6483bbcf0aa8608790dcc657a5a2a761ae9c8c6", "SHA256 计算结果不正确")

const sha512 = await Sha512.digest_u8(new Uint8Array(data))
console.assert(sha512 === "e2f81cb44129e1bc58941e7b3db1ffba40357889bace4fd65fd254d0be1bb757625bdf36bf46d555eb3ca4b130dcd1c05225caec28d8472dccf52a63dbd6e185", "SHA512 计算结果不正确")