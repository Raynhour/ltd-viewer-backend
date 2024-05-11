import type { Config } from '../api/api'

export default interface ApiContractor {
  get: (url: string, config?: Config) => Promise<any>
  post: <Res>(url: string, data?: any, config?: Config) => Promise<Res>
  // put: <Config, Data, Res>(url: string, data?: Data, config?: Config) => Promise<Res>
  // remove: <Config, Res>(url: string, config?: Config) => Promise<Res>
}
