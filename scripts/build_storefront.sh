#!/bin/sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
OUT="$ROOT/build/storefront"

rm -rf "$OUT"
mkdir -p "$OUT/data"
cp "$ROOT/index.html" "$ROOT/style.css" "$OUT/"
cp -R "$ROOT/assets" "$ROOT/js" "$OUT/"
cp "$ROOT/data/products.json" "$OUT/data/products.json"
printf 'Built storefront into %s\n' "$OUT"
