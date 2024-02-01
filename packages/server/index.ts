import express, { Express } from "express"
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
    const cacheService = new CacheService()
    const fileService = new FileService(this.config)
    const routesService = new RoutesService(this.config)

    this.ui = new MockServerUI(this.app, this.config, {
      file: fileService,
      cache: cacheService,
      routes: routesService,
    })
    // MockServer APIs
    this.api = new MockServerAPI(this.app, this.config, {
      file: fileService,
      routes: routesService,
      cache: cacheService,
    })
  }
}
