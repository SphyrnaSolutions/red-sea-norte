import xmlrpc from "xmlrpc"
import { getOdooConfig } from "./config"
import type { OdooConfig, LeadCreateData } from "./types"

type XmlRpcClient = ReturnType<typeof xmlrpc.createClient>

const AUTH_CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

let cachedUid: number | null = null
let cachedAt = 0

function createXmlRpcClient(baseUrl: string, path: string): XmlRpcClient {
  const url = new URL(path, baseUrl)
  const isSecure = url.protocol === "https:"

  const options = {
    host: url.hostname,
    port: Number(url.port) || (isSecure ? 443 : 80),
    path: url.pathname,
  }

  return isSecure
    ? xmlrpc.createSecureClient(options)
    : xmlrpc.createClient(options)
}

function callXmlRpc(
  client: XmlRpcClient,
  method: string,
  params: unknown[]
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    client.methodCall(method, params, (error, value) => {
      if (error) {
        const message = error instanceof Error ? error.message : String(error)
        reject(new Error(`[Odoo API] ${method} failed: ${message}`))
        return
      }
      resolve(value)
    })
  })
}

export async function authenticate(config: OdooConfig): Promise<number> {
  const now = Date.now()

  if (cachedUid !== null && now - cachedAt < AUTH_CACHE_TTL_MS) {
    return cachedUid
  }

  const client = createXmlRpcClient(config.url, "/xmlrpc/2/common")

  const uid = await callXmlRpc(client, "authenticate", [
    config.db,
    config.login,
    config.apiKey,
    {},
  ])

  if (typeof uid !== "number" || uid <= 0) {
    throw new Error(
      "[Odoo API] Authentication failed: invalid credentials or inactive user"
    )
  }

  cachedUid = uid
  cachedAt = now

  return uid
}

export async function executeKw(
  config: OdooConfig,
  uid: number,
  model: string,
  method: string,
  args: unknown[]
): Promise<unknown> {
  const client = createXmlRpcClient(config.url, "/xmlrpc/2/object")

  return callXmlRpc(client, "execute_kw", [
    config.db,
    uid,
    config.apiKey,
    model,
    method,
    args,
  ])
}

export async function createLead(data: LeadCreateData): Promise<number> {
  const config = getOdooConfig()
  const uid = await authenticate(config)

  const result = await executeKw(config, uid, "crm.lead", "create", [[data]])

  if (typeof result !== "number") {
    throw new Error("[Odoo API] createLead: unexpected response from Odoo")
  }

  return result
}

export async function searchOrCreateUtmSource(
  name: string
): Promise<number> {
  const config = getOdooConfig()
  const uid = await authenticate(config)

  const searchResult = await executeKw(
    config,
    uid,
    "utm.source",
    "search",
    [[["name", "=", name]]]
  )

  if (Array.isArray(searchResult) && searchResult.length > 0) {
    return searchResult[0] as number
  }

  const createResult = await executeKw(
    config,
    uid,
    "utm.source",
    "create",
    [[{ name }]]
  )

  if (typeof createResult !== "number") {
    throw new Error(
      "[Odoo API] searchOrCreateUtmSource: unexpected response from Odoo"
    )
  }

  return createResult
}
