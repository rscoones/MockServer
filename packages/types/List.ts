import { Mock } from "./Mock"

export enum HTTPMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export interface List {
  routes: ListRoute[]
  verbs: HTTPMethod[]
}

export interface ListRoute extends HTTPMethodMocks {
  fullUrl: string
  url: string
}

export type HTTPMethodMocks = {
  [key in HTTPMethod]?: Mock
}
