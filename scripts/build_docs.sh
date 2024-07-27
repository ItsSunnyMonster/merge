#!/bin/sh

rustup default stable
cargo doc --no-deps
echo "<meta http-equiv=\"refresh\" content=\"0; url=merge\">" > target/doc/index.html