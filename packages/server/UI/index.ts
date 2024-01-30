import express, { Express, Request, Response } from "express"
import Config from "../config"
import FileService from "../services/file"
import CacheService from "../services/cache"
import { Mock } from "@mockapiserver/types/Mock"
import { List } from "@mockapiserver/types/List"

export default class MockServerUI {
  constructor(
    private app: Express,
    private config: Config,
    private services: { file: FileService; cache: CacheService }
  ) {
    this.initialise()
  }

  protected initialise() {
    this.app.use(
      this.config.get().ui.url,
      express.static(this.config.get().ui.location)
    )
    this.app.get(this.config.get().ui + "api/", this.get)
    this.app.post(this.config.get().ui + "api/", this.post)
  }

  private async get(
    req: Request,
    res: Response<Mock | List | { error: string }>
  ) {
    try {
      if (req.query.url) {
        const data = await this.services.file.get(req.query.url as string)
        return res.json(data)
      } else {
        const data = await this.services.file.list()
        return res.json(data)
      }
    } catch (e) {
      console.log(e)
    }

    res.status(404)
    return res.json({ error: "Not Found" })
  }

  private async post(req: Request, res: Response) {
    if (req.body.data) {
      const method = req.body.method
      const data = req.body.data
      await this.services.file.update(method, data)
      return res.json({ success: true })
    } else if (req.body.filename) {
      await this.services.file.useFile(req.body.filename)
      return res.json({ success: true })
    }

    res.status(404)
    return res.json({ success: false })
  }
}
