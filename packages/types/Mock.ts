export interface Mock {
  mockServerType: MockServerType
  status: number
  headers: { [key: string]: string }
  body: { [key: string]: string }
  type: MockServerType
}

export enum MockServerType {
  object = "object",
  function = "function",
}
