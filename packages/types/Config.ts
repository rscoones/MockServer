import { SessionOptions } from "express-session"

export interface Config {
  base: {
    /** Base URL of all requests @default ```"/api"```*/
    url: string
    /** Mocks location @default ```"<current directory>/api"``` */
    location: string
  }
  ui: {
    /** UI portal for editting mocks @default ```"/portal"```` */
    url: string
    /** MockServer UI location @default ```mockapiserver's UI``` */
    location: string
  }
  /** Supported HTTP methods @default ```["GET", "POST", "PUT", "DELETE"]``` */
  verbs: string[]
  /** Session settings, uses "express-session" */
  session: SessionOptions
}
