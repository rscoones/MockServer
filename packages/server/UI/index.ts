import express, { Express, Request, Response } from "express"
import Config from "../config"
import FileService from "../services/file"
import { List, ListRoute } from "@mockapiserver/types/List"
import { Presets } from "@mockapiserver/types/Presets"
import CacheService from "../services/cache"
import { Update, UpdateResponse } from "@mockapiserver/types/Update"
import { MockLike } from "@mockapiserver/types/Mock"
import RoutesService from "../services/routes"
import { parseMock } from "../helpers/respond"

export default class MockServerUI {
  constructor(
    private app: Express,
    private config: Config,
    private services: {
      file: FileService
      cache: CacheService
      routes: RoutesService
    }
  ) {
    this.initialise()
  }

  protected initialise() {
    this.app.use(
      this.config.get().ui.url,
      express.static(this.config.get().ui.location)
    )
    this.app.get(this.config.get().ui.url + "/api", this.get.bind(this))
    this.app.post(this.config.get().ui.url + "/api", this.post.bind(this))
  }

  private async get(
    req: Request,
    res: Response<Presets | List | { error: string }>
  ) {
    try {
      if (req.query.url) {
        const data = await this.services.file.presetsForUrl(
          req.query.url as string
        )
        return res.json(data)
      } else {
        const data: List = { routes: [], verbs: this.config.get().verbs }
        const routePaths = this.services.routes.get()
        const obj: { [key: string]: ListRoute } = {}
        for (const route of routePaths) {
          let r = await this.services.cache.get(
            req.sessionID,
            route.method,
            route.path
          )
          if (!r) {
            r = this.services.file.get(route.method, route.path)
          }
          if (!obj[route.path]) {
            obj[route.path] = {
              url: route.path,
              fullUrl: this.config.get().base.url + route.path,
            }
          }
          obj[route.path][route.method] = await parseMock(r, req)
        }

        Object.keys(obj).forEach((t) => data.routes.push(obj[t]))

        return res.json(data)
      }
    } catch (e) {
      console.log(e)
    }

    res.status(404)
    return res.json({ error: "Not Found" })
  }

  private async post(
    req: Request<any, UpdateResponse, Update>,
    res: Response<UpdateResponse>
  ) {
    let mock: MockLike
    const { method, data, url, filename } = req.body
    if (data) {
      mock = JSON.parse(data)
    } else if (req.body.filename) {
      mock = this.services.file.getPreset(url, req.body.filename)
    } else {
      res.status(404)
      return res.json({ success: false })
    }

    await this.services.cache.set(req.sessionID, method, url, mock)
    return res.json({ success: true })
  }
}
