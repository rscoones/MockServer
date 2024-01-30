import { Request } from "express"

export interface Mock {
  mockServerType: MockServerType
  status: number
  headers: { [key: string]: string }
  body: { [key: string]: string }
  /** @dprecated Use contentType instead */
  type: string
  contentType: string
  raw: string
}

export enum MockServerType {
  object = "object",
  function = "function",
  promise = "promise",
}

type Fpromise = (req: Request) => Promise<Mock>
type Ffunc = (req: Request) => Mock
export type MockLike = Fpromise | Ffunc | Mock
