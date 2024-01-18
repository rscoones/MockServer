import walk from "rs-filewalk"
import path from "path"
import { Express } from "express"
import { Config } from "@mockapiserver/types/Config"
import params from "../helpers/params"

export default class MockServerAPI {
  private app: Express
  private config: Config

  constructor(app: Express, config: Config) {
    this.app = app
    this.config = config

    this.initialise()
  }

  protected initialise() {}

  private parseFiles() {
    var files = walk(this.config.base.location)

    files.forEach((file) => {
      var method = this.getMethod(file)

      if (method) {
        var route = "/" + file.folder.replace(file.base, "").replace(/\\/g, "/")
        route = route.replace(/\/\//g, "/") // replace double '/' => mac issue?
        route = params.toURL(route)
        route = this.config.base.url.replace(/\/$/, "") + route
        var data = require(path.join(file.folder, file.file.replace(".js", "")))
        response.set({ path: route }, method, data)

        this.app[method.toLowerCase()](route, (req, res) => {
          respond(req, res, response.get(req))
        })
      }
    })
  }

  private getMethod(file: any) {
    var method = file.file.replace(".js", "")
    if (this.config.verbs.indexOf(method) > -1) {
      return method
    } else {
      return null
    }
  }
}
