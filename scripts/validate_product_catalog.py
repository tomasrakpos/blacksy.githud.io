#!/usr/bin/env python3
"""Validate the editable, fixed-size storefront product catalog."""
from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data" / "products.json"
EXPECTED_COUNT = 70
REQUIRED = {
    "id", "sku", "slug", "name", "brand", "model", "category", "cat", "kind",
    "short_description", "description", "price", "currency", "platforms", "images",
    "specifications", "stock", "status", "source", "source_url", "spec_source_url",
    "image_source_url", "checked_at",
}


def fail(message: str) -> None:
    raise SystemExit(f"Catalog validation failed: {message}")


def main() -> None:
    products = json.loads(CATALOG.read_text(encoding="utf-8"))
    if not isinstance(products, list) or len(products) != EXPECTED_COUNT:
        fail(f"expected exactly {EXPECTED_COUNT} products; found {len(products) if isinstance(products, list) else 'non-list'}")

    for field in ("id", "sku", "slug"):
        values = [product.get(field) for product in products]
        if any(value in (None, "") for value in values) or len(set(values)) != EXPECTED_COUNT:
            fail(f"{field} values must be present and unique")

    for product in products:
        missing = REQUIRED - product.keys()
        if missing:
            fail(f"{product.get('sku', 'unknown')}: missing fields {sorted(missing)}")
        if not all(str(product[field]).strip() for field in ("name", "brand", "model", "category", "description")):
            fail(f"{product['sku']}: name, brand, model, category and description are required")
        if not isinstance(product["specifications"], dict) or not product["specifications"]:
            fail(f"{product['sku']}: specifications must be a non-empty object")
        if product["price"] is not None and (not isinstance(product["price"], (int, float)) or product["price"] <= 0):
            fail(f"{product['sku']}: price must be a positive number or null")
        if product["price"] is None and product.get("price_source_url"):
            fail(f"{product['sku']}: remove price_source_url when no current price is confirmed")
        if not product["images"]:
            fail(f"{product['sku']}: at least one image is required")
        for image in product["images"]:
            if image.startswith("/"):
                local_path = ROOT / image.lstrip("/").split("?", 1)[0]
                if not local_path.is_file():
                    fail(f"{product['sku']}: missing local image {image}")
            elif urlparse(image).scheme not in {"http", "https"}:
                fail(f"{product['sku']}: image must be a local path or an HTTP(S) URL")
        for field in ("source_url", "spec_source_url", "image_source_url"):
            if urlparse(product[field]).scheme not in {"http", "https"}:
                fail(f"{product['sku']}: {field} must be an HTTP(S) URL")
        if not product["checked_at"]:
            fail(f"{product['sku']}: checked_at is required")

    mice = [product for product in products if product.get("kind") == "ماوس گیمینگ"]
    if len(mice) != 10:
        fail(f"expected exactly 10 gaming mice; found {len(mice)}")
    if {product["id"] for product in mice} != {23, 24, 51, 52, 53, 54, 55, 56, 57, 58}:
        fail("the gaming-mouse showcase must include the two existing mice and eight new catalog entries")
    if len({product["model"] for product in mice}) != 10:
        fail("the 10 gaming mice must be distinct models")
    if any(product["price"] is None or not product.get("price_source_url") for product in mice):
        fail("every showcased gaming mouse must have a sourced price")

    keyboards = [product for product in products if product.get("kind") == "کیبورد گیمینگ" and 59 <= product.get("id", 0) <= 68]
    if len(keyboards) != 10:
        fail(f"expected exactly 10 newly added gaming keyboards; found {len(keyboards)}")
    if {product["id"] for product in keyboards} != set(range(59, 69)):
        fail("the keyboard showcase must include catalog entries 59 through 68")
    if len({product["model"] for product in keyboards}) != 10:
        fail("the 10 showcased gaming keyboards must be distinct models")
    for product in keyboards:
        if product["price"] is None or product.get("price_source") != "Torob":
            fail(f"{product['sku']}: every showcased keyboard must have a Torob-sourced price")
        if any(urlparse(product[field]).hostname not in {"torob.com", "www.torob.com"} for field in ("source_url", "spec_source_url", "image_source_url", "price_source_url")):
            fail(f"{product['sku']}: product information must be sourced from Torob")
        if any(not image.startswith("https://image.torob.com/") for image in product["images"]):
            fail(f"{product['sku']}: keyboard images must be served by Torob")

    categories = {product["category"] for product in products}
    if len(categories) < 15:
        fail(f"catalog variety looks too low ({len(categories)} categories)")
    print(f"Catalog valid: {len(products)} unique products across {len(categories)} categories, including {len(mice)} gaming mice and {len(keyboards)} gaming keyboards.")


if __name__ == "__main__":
    main()
