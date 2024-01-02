#![allow(clippy::new_without_default)]

mod utils;

use md5::{Md5 as _Md5, Md5Core};
use sha2::{
    digest::{consts::*, core_api::*},
    Digest, OidSha256, OidSha512, Sha256 as _Sha256, Sha256VarCore, Sha512 as _Sha512, Sha512VarCore,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

type Md5Hash = CoreWrapper<Md5Core>;
generate!(Md5, _Md5, Md5Hash);
type Sha256Hash = CoreWrapper<CtVariableCoreWrapper<Sha256VarCore, U32, OidSha256>>;
generate!(Sha256, _Sha256, Sha256Hash);
type Sha512Hash = CoreWrapper<CtVariableCoreWrapper<Sha512VarCore, U64, OidSha512>>;
generate!(Sha512, _Sha512, Sha512Hash);
