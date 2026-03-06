import type { OdooConfig } from "./types"

const REQUIRED_VARS = [
  "ODOO_URL",
  "ODOO_DB",
  "ODOO_LOGIN",
  "ODOO_API_KEY",
] as const

export function getOdooConfig(): OdooConfig {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}`
    )
  }

  return {
    url: process.env.ODOO_URL!,
    db: process.env.ODOO_DB!,
    login: process.env.ODOO_LOGIN!,
    apiKey: process.env.ODOO_API_KEY!,
  }
}
