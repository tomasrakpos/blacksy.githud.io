#!/bin/sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
OUT="$ROOT/build/admin"

rm -rf "$OUT"
mkdir -p "$OUT/data"
cp "$ROOT/index.html" "$ROOT/style.css" "$OUT/"
cp -R "$ROOT/js" "$OUT/"
cp "$ROOT/data/products.seed.json" "$OUT/data/products.seed.json"
# The admin UI uses these public storefront images for local image previews/fallbacks.
cp -R "$ROOT/../assets" "$OUT/assets"
printf 'Built admin UI into %s\n' "$OUT"
