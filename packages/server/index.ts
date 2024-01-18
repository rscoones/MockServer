import express, { Express } from "express"
import { Config } from "@mockapiserver/types/Config"
import MockServerUI from "./UI"
import MockServerAPI from "./API"

export default class MockServer {
  private app: Express
  private _config: Config
  set config(cfg: Config) {
    this._config = cfg
  }
  get config() {
    return this._config
  }

  ui: MockServerUI
  api: MockServerAPI

  constructor(app: Express, config: Config) {
    this.app = app
    this.config = config

    this.initialise()
  }

  protected initialise() {
    this.ui = new MockServerUI(this.app, this.config)
    // MockServer APIs
    this.api = new MockServerAPI(this.app, this.config)
  }
}
