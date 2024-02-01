import { Mock, MockLike } from "@mockapiserver/types/Mock"
import { Request, Response } from "express"

export default async function respond(
  req: Request,
  res: Response,
  data: MockLike
) {
  const mock = await parseMock(data, req)
  res.status(mock.status || 200)
  res.set(mock.headers)
  res.type(mock.type || "json")
  res.json(mock.body)
}

export async function parseMock(data: MockLike, req: Request): Promise<Mock> {
  if (typeof data === "function") {
    let temp = data(req)
    if ("then" in temp) {
      return await temp
    }

    return temp
  }

  return data
}
