export interface IExecuteQueryOptions {
  query: string
  parameters?: any[]
  omits?: string[]
}

export interface IExecuteOptions {
  omits?: string[]
}

export interface IQueryGenerator {
  query: string
  parameters: any[]
}

export interface IPaginate {
  rowCount: number
  rows: Record<string, any>[]
  total_count?: number
  total_page?: number
  page?: number
  limit?: number
  nextPage?: number
  prevPage?: number
}
