import { Mock } from "./Mock"

export interface List {
  routes: ListRoute[]
  verbs: string[]
}

export interface ListRoute {
  fullUrl: string
  url: string
  [key: string]: Mock
}
