import { HTTPMethod } from "./List"

export interface Update {
  /** @description Raw data to set as mock */
  data?: string
  /** @description Preset filename */
  filename?: string
  method: HTTPMethod
  url: string
}

export interface UpdateResponse {
  success: boolean
}
