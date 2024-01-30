import { Express } from "express"
import { Config as ConfigBase } from "@mockapiserver/types/Config"

import MockServerUI from "./UI"
import MockServerAPI from "./API"
import Config from "./config"
import FileService from "./services/file"
import RoutesService from "./services/routes"
import CacheService from "./services/cache"

export default class MockServer {
  private config: Config
  ui: MockServerUI
  api: MockServerAPI

  constructor(
    private app: Express,
    config: ConfigBase
  ) {
    this.config = new Config(config)

    this.initialise()
  }

  protected initialise() {
    const fileService = new FileService(this.config)
    const routesService = new RoutesService(this.config)
    const cacheService = new CacheService()
    routesService.refresh()

    this.ui = new MockServerUI(this.app, this.config, {
      file: fileService,
      cache: cacheService,
    })
    // MockServer APIs
    this.api = new MockServerAPI(this.app, this.config, {
      file: fileService,
      routes: routesService,
      cache: cacheService,
    })
  }
}
