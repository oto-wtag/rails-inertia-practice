import type { Pagination } from "@/types/index"

export interface Country {
  code: string
  created_at: string
  created_by_id: number
  description: string
  id: number
  name: string
  updated_at: string
}

export interface CountryList {
  countries: Country[]
  pagination: Pagination
  q: string
}
