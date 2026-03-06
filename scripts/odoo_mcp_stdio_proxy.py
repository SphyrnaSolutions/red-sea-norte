#!/usr/bin/env python3
"""Bridge a stdio MCP client to an HTTP JSON-RPC MCP endpoint."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request


URL = os.environ.get("ODOO_MCP_URL", "").strip()
API_KEY = os.environ.get("ODOO_MCP_API_KEY", "").strip()
TIMEOUT = float(os.environ.get("ODOO_MCP_TIMEOUT", "60"))


def fail(message: str) -> None:
    sys.stderr.write(f"{message}\n")
    sys.stderr.flush()
    raise SystemExit(1)


def read_message() -> dict | None:
    headers: dict[str, str] = {}

    while True:
        line = sys.stdin.buffer.readline()
        if not line:
            return None if not headers else fail("Unexpected EOF while reading MCP headers")
        if line in (b"\r\n", b"\n"):
            break
        if b":" not in line:
            fail(f"Malformed MCP header: {line!r}")
        name, value = line.decode("utf-8").split(":", 1)
        headers[name.strip().lower()] = value.strip()

    content_length = headers.get("content-length")
    if not content_length:
        fail("Missing Content-Length header")

    try:
        size = int(content_length)
    except ValueError as exc:
        fail(f"Invalid Content-Length header: {content_length}") from exc

    payload = sys.stdin.buffer.read(size)
    if len(payload) != size:
        fail("Unexpected EOF while reading MCP body")

    return json.loads(payload.decode("utf-8"))


def write_message(message: dict) -> None:
    payload = json.dumps(message, ensure_ascii=True, separators=(",", ":")).encode("utf-8")
    sys.stdout.buffer.write(f"Content-Length: {len(payload)}\r\n\r\n".encode("ascii"))
    sys.stdout.buffer.write(payload)
    sys.stdout.buffer.flush()


def send_upstream(message: dict) -> dict | None:
    outbound = dict(message)

    # The remote Odoo server implements an older initialize notification name.
    if outbound.get("method") == "notifications/initialized":
        outbound["method"] = "initialized"

    data = json.dumps(outbound, ensure_ascii=True, separators=(",", ":")).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    if API_KEY:
        headers["X-API-Key"] = API_KEY

    request = urllib.request.Request(URL, data=data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            raw_body = response.read().decode("utf-8").strip()
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace").strip()
        return {
            "jsonrpc": "2.0",
            "id": message.get("id"),
            "error": {
                "code": -32000,
                "message": f"Upstream HTTP {exc.code}",
                "data": body,
            },
        }
    except urllib.error.URLError as exc:
        return {
            "jsonrpc": "2.0",
            "id": message.get("id"),
            "error": {
                "code": -32001,
                "message": f"Upstream connection failed: {exc.reason}",
            },
        }

    if not raw_body:
        return None

    upstream_message = json.loads(raw_body)

    if "id" in message and "id" not in upstream_message:
        upstream_message["id"] = message["id"]

    return upstream_message


def main() -> None:
    if not URL:
        fail("Missing ODOO_MCP_URL")

    while True:
        message = read_message()
        if message is None:
            return

        response = send_upstream(message)

        if response is not None and "id" in message:
            write_message(response)


if __name__ == "__main__":
    main()
