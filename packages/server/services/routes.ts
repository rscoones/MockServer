import path from "path"
import walk from "rs-filewalk"
import Config from "../config"
import { File } from "@mockapiserver/types/FileWalk"
import { Config as ConfigBase } from "@mockapiserver/types/Config"

interface Route {
  path: string
  method: string
}

export default class RoutesService {
  private routes: Route[]

  constructor(private config: Config) {}

  get(): Route[] {
    return this.routes
  }

  refresh() {
    const files: File[] = walk(this.config.get().base.location)
    this.routes = files.map((f) => {
      const method = getMethod(this.config.get().verbs, f.file)
      const route = f.folder.replace(path.sep, "/")

      return { path: route, method }
    })
  }
}

function getMethod(verbs: ConfigBase["verbs"], file) {
  var method = file.file.replace(/\.[jt]s/, "")
  if (verbs.indexOf(method) > -1) {
    return method
  } else {
    return null
  }
}
