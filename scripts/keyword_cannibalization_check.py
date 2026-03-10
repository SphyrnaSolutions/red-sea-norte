#!/usr/bin/env python3
"""
Keyword Cannibalization Detection Script
=========================================
Fetches all pages from Wagtail CMS API and detects keyword conflicts:
  - Exact duplicates (CRITICAL)
  - Substring conflicts (WARNING)
  - High token overlap >60% (INFO)

Wagtail's /api/v2/pages/ endpoint only supports custom fields (primary_keyword,
cluster_id, cluster_role) when filtered by a specific content type via ?type=.
This script fetches pages per known content type to gather those fields.

Usage:
    python3 scripts/keyword_cannibalization_check.py
    python3 scripts/keyword_cannibalization_check.py --wagtail-url https://back.redsea.sphyrnasolutions.com

Exit codes:
    0 - No critical issues (exact duplicates)
    1 - Critical issues found
"""

import argparse
import json
import sys
import urllib.request
import urllib.parse
from datetime import date


DEFAULT_WAGTAIL_URL = "https://back.redsea.sphyrnasolutions.com"
BATCH_SIZE = 20
MAX_ITERATIONS = 50

# Known content types that have primary_keyword + URL path prefix
# Maps Wagtail content type -> URL prefix (same as cluster-resolver.ts typeMap)
CONTENT_TYPES: dict[str, str] = {
    "blog.BlogPostPage": "blog",
    "rutas.RutaPage": "rutas",
    "pecios.PecioPage": "pecios",
    "destinos.DestinoPage": "destinos",
    "logistica.LogisticaPage": "logistica",
    "vida_a_bordo.VidaABordoPage": "vida-a-bordo",
}


def fetch_pages_by_type(base_url: str, page_type: str, url_prefix: str) -> list[dict]:
    """Fetch all pages of a specific content type, returning pages enriched with _url."""
    pages: list[dict] = []
    offset = 0
    fields = "title,primary_keyword,cluster_id,cluster_role"

    for _ in range(MAX_ITERATIONS):
        params = urllib.parse.urlencode({
            "type": page_type,
            "fields": fields,
            "limit": str(BATCH_SIZE),
            "offset": str(offset),
        })
        url = f"{base_url.rstrip('/')}/api/v2/pages/?{params}"

        try:
            req = urllib.request.Request(url, headers={"Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=30) as response:
                data = json.loads(response.read().decode("utf-8"))
        except Exception as exc:
            # 400 likely means this type doesn't exist in this install — skip silently
            print(f"  [skip] {page_type}: {exc}", file=sys.stderr)
            return []

        items = data.get("items", [])
        total_count = data.get("meta", {}).get("total_count", 0)

        for item in items:
            slug = item.get("meta", {}).get("slug", "")
            item["_url"] = f"/{url_prefix}/{slug}"
            item["_type"] = page_type
            pages.append(item)

        if not items or len(pages) >= total_count:
            break
        offset += BATCH_SIZE

    return pages


def fetch_all_pages(base_url: str) -> list[dict]:
    """Fetch all known content types from Wagtail API."""
    all_pages: list[dict] = []
    for page_type, url_prefix in CONTENT_TYPES.items():
        fetched = fetch_pages_by_type(base_url, page_type, url_prefix)
        if fetched:
            print(f"  {page_type}: {len(fetched)} pages", file=sys.stderr)
        all_pages.extend(fetched)
    return all_pages


def normalize(keyword: str) -> str:
    """Lowercase + strip normalization for consistent comparison."""
    return keyword.lower().strip()


def tokenize(keyword: str) -> set[str]:
    """Split keyword into tokens (words), normalized."""
    return set(normalize(keyword).split())


def token_overlap_ratio(tokens_a: set[str], tokens_b: set[str]) -> float:
    """Jaccard-like: intersection / union of token sets."""
    if not tokens_a or not tokens_b:
        return 0.0
    intersection = tokens_a & tokens_b
    union = tokens_a | tokens_b
    return len(intersection) / len(union)


def detect_conflicts(
    pages_with_kw: list[dict],
) -> tuple[list, list, list]:
    """
    Returns three lists:
      - exact_duplicates: list of (page_a, page_b) with same normalized keyword
      - substring_conflicts: list of (page_a, page_b, sub_keyword_str)
      - high_overlap: list of (page_a, page_b, overlap_ratio_float)
    """
    exact_duplicates: list[tuple[dict, dict]] = []
    substring_conflicts: list[tuple[dict, dict, str]] = []
    high_overlap: list[tuple[dict, dict, float]] = []
    seen_pairs: set[frozenset] = set()

    for i, page_a in enumerate(pages_with_kw):
        kw_a = normalize(page_a["primary_keyword"])
        tokens_a = tokenize(page_a["primary_keyword"])

        for page_b in pages_with_kw[i + 1:]:
            kw_b = normalize(page_b["primary_keyword"])
            tokens_b = tokenize(page_b["primary_keyword"])

            pair_key = frozenset([page_a["_url"], page_b["_url"]])
            if pair_key in seen_pairs:
                continue

            if kw_a == kw_b:
                exact_duplicates.append((page_a, page_b))
                seen_pairs.add(pair_key)
            elif kw_a in kw_b:
                substring_conflicts.append((page_a, page_b, kw_a))
                seen_pairs.add(pair_key)
            elif kw_b in kw_a:
                substring_conflicts.append((page_b, page_a, kw_b))
                seen_pairs.add(pair_key)
            else:
                overlap = token_overlap_ratio(tokens_a, tokens_b)
                if overlap >= 0.6:
                    high_overlap.append((page_a, page_b, overlap))
                    seen_pairs.add(pair_key)

    return exact_duplicates, substring_conflicts, high_overlap


def print_report(
    total_pages: int,
    pages_with_kw: list[dict],
    exact_duplicates: list,
    substring_conflicts: list,
    high_overlap: list,
) -> None:
    """Print the structured cannibalization report to stdout."""
    today = date.today().strftime("%Y-%m-%d")

    print("=" * 50)
    print("=== KEYWORD CANNIBALIZATION REPORT ===")
    print("=" * 50)
    print(f"Date: {today}")
    print(f"Total pages analyzed: {total_pages}")
    print(f"Pages with primary_keyword: {len(pages_with_kw)}")
    print()

    # --- EXACT DUPLICATES ---
    print("-" * 50)
    print("--- EXACT DUPLICATES (CRITICAL) ---")
    print("-" * 50)
    if exact_duplicates:
        for page_a, page_b in exact_duplicates:
            kw = normalize(page_a["primary_keyword"])
            print(f'  Keyword: "{kw}"')
            print(f'    Page A: "{page_a["title"]}" -> {page_a["_url"]}')
            print(f'    Page B: "{page_b["title"]}" -> {page_b["_url"]}')
            print(f'    ACTION: One page must change its primary_keyword immediately.')
            print()
    else:
        print("  None found")
        print()

    # --- SUBSTRING CONFLICTS ---
    print("-" * 50)
    print("--- SUBSTRING CONFLICTS (WARNING) ---")
    print("-" * 50)
    if substring_conflicts:
        for shorter, longer, sub_kw in substring_conflicts:
            print(f'  Keyword A: "{shorter["primary_keyword"]}" -> {shorter["_url"]}')
            print(f'  Keyword B: "{longer["primary_keyword"]}" -> {longer["_url"]}')
            print(f'  Overlap: "{sub_kw}" is a substring of Keyword B')
            print(f'  Recommendation: Differentiate search intent or merge pages')
            print()
    else:
        print("  None found")
        print()

    # --- HIGH TOKEN OVERLAP ---
    print("-" * 50)
    print("--- HIGH TOKEN OVERLAP (>60%) (INFO) ---")
    print("-" * 50)
    if high_overlap:
        for page_a, page_b, overlap_ratio in high_overlap:
            pct_str = f"{overlap_ratio * 100:.0f}%"
            print(f'  Keyword A: "{page_a["primary_keyword"]}" -> {page_a["_url"]}')
            print(f'  Keyword B: "{page_b["primary_keyword"]}" -> {page_b["_url"]}')
            print(f'  Token overlap: {pct_str}')
            print(f'  Recommendation: Review whether both pages target distinct queries')
            print()
    else:
        print("  None found")
        print()

    # --- SUMMARY ---
    print("=" * 50)
    print("=== SUMMARY ===")
    print("=" * 50)
    critical = len(exact_duplicates)
    warning = len(substring_conflicts)
    info = len(high_overlap)
    print(f"Critical: {critical} | Warning: {warning} | Info: {info}")

    if critical == 0 and warning == 0 and info == 0:
        print("No keyword conflicts detected. Site is clean.")
    elif critical > 0:
        print(f"ACTION REQUIRED: {critical} exact duplicate keyword(s) found.")
    else:
        print("No critical issues. Review warnings and info items at your discretion.")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Detect keyword cannibalization in Wagtail CMS pages."
    )
    parser.add_argument(
        "--wagtail-url",
        default=DEFAULT_WAGTAIL_URL,
        help=f"Wagtail base URL (default: {DEFAULT_WAGTAIL_URL})",
    )
    args = parser.parse_args()

    print(f"Fetching pages from {args.wagtail_url} ...", file=sys.stderr)
    all_pages = fetch_all_pages(args.wagtail_url)
    print(f"Total pages fetched: {len(all_pages)}", file=sys.stderr)

    # Filter to pages that have a non-empty primary_keyword
    pages_with_kw: list[dict] = [
        page for page in all_pages
        if isinstance(page.get("primary_keyword"), str)
        and page["primary_keyword"].strip()
    ]

    print(f"Pages with primary_keyword: {len(pages_with_kw)}", file=sys.stderr)

    exact_duplicates, substring_conflicts, high_overlap = detect_conflicts(pages_with_kw)

    print_report(
        total_pages=len(all_pages),
        pages_with_kw=pages_with_kw,
        exact_duplicates=exact_duplicates,
        substring_conflicts=substring_conflicts,
        high_overlap=high_overlap,
    )

    # Exit code: 1 if exact duplicates found (critical), 0 otherwise
    return 1 if exact_duplicates else 0


if __name__ == "__main__":
    sys.exit(main())
