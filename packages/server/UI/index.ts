import express, { Express } from "express"
import { Config } from "@mockapiserver/types/Config"

export default class MockServerUI {
  private app: Express
  private config: Config

  constructor(app: Express, config: Config) {
    this.app = app
    this.config = config

    this.initialise()
  }

  protected initialise() {
    this.app.use(this.config.ui.url, express.static(this.config.ui.location))
    this.app.get(this.config.ui + "api/", this.get)
    this.app.post(this.config.ui + "api/", this.post)
  }

  private get() {
    return require("../api/GET")
  }

  private post() {
    return require("../api/POST")
  }
}
