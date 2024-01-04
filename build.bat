@echo off

wasm-pack build --release --target web --out-dir dist/lib
cd node
node patch.mjs
node test.js
node test.mjs
cd ../
