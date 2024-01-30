import { Express, Request } from "express"
import path from "path"
import Config from "../config"
import FileService from "../services/file"
import RoutesService from "../services/routes"
import CacheService from "../services/cache"
import { Mock } from "@mockapiserver/types/Mock"
import respond from "../helpers/respond"

export default class MockServerAPI {
  private app: Express
  private config: Config

  constructor(
    app: Express,
    config: Config,
    private services: {
      file: FileService
      routes: RoutesService
      cache: CacheService
    }
  ) {
    this.app = app
    this.config = config

    this.initialise()
  }

  protected initialise() {
    this.services.routes.get().forEach((route) => {
      this.app[route.method](
        path.join(this.config.get().base.url, route.path),
        async (req: Request, res) => {
          const path = route.path
          let data = await this.services.cache.get(
            res.sessionId,
            route.method,
            path
          )
          if (!data) {
            data = await this.services.file.get(route.method, path)
          }
          respond(req, res, data)
        }
      )
    })
  }
}
