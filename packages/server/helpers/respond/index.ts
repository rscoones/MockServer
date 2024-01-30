import { Mock, MockLike } from "@mockapiserver/types/Mock"
import { Request, Response } from "express"

export default async function respond(
  req: Request,
  res: Response,
  data: MockLike
) {
  let mock: Mock
  if (typeof data === "function") {
    let temp = data(req)
    if ("then" in temp) {
      mock = await temp
    } else {
      mock = temp
    }
  } else {
    mock = data
  }

  res.status(mock.status || 200)
  res.set(mock.headers)
  res.type(mock.type || "json")
  res.json(mock.body)
}
