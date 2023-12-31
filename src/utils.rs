#![allow(unused)]
pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[macro_export]
macro_rules! generate {
    ( $st:ident, $mt:ident, $ht:ident) => {
        #[wasm_bindgen]
        pub struct $st {
            hash: $ht,
        }

        #[wasm_bindgen]
        impl $st {
            pub fn new() -> Self {
                Self { hash: $mt::new() }
            }

            pub async fn digest(data: &str) -> String {
                let hash = $mt::digest(data.as_bytes());
                format!("{:x}", hash)
            }

            pub async fn digest_u8(data: &[u8]) -> String {
                let hash = $mt::digest(data);
                format!("{:x}", hash)
            }

            pub async fn update(&mut self, data: &[u8]) {
                self.hash.update(data)
            }

            pub fn finalize(self) -> String {
                format!("{:x}", self.hash.finalize())
            }
        }
    };
}
