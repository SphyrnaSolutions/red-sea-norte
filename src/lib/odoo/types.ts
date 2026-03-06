export type OdooConfig = {
  url: string
  db: string
  login: string
  apiKey: string
}

export type LeadCreateData = {
  name: string
  contact_name: string
  email_from: string
  phone: string
  description: string
  source_id?: number
  medium_id?: number
  website?: string
}

export type OdooAuthResult = number
