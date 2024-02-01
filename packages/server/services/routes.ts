import path from "path"
import walk from "rs-filewalk"
import Config from "../config"
import { File } from "@mockapiserver/types/FileWalk"
import { Config as ConfigBase } from "@mockapiserver/types/Config"
import { HTTPMethod } from "@mockapiserver/types/List"

interface Route {
  path: string
  method: HTTPMethod
}

export default class RoutesService {
  private routes: Route[]

  constructor(private config: Config) {
    this.refresh()
  }

  get(): Route[] {
    return this.routes
  }

  refresh() {
    const files: File[] = walk(this.config.get().base.location)
    this.routes = files
      .map((f) => {
        const method = getMethod(this.config.get().verbs, f.file)
        const route = f.folder.replace(path.sep, "/")

        if (method) {
          return { path: route, method }
        }
      })
      .filter((t) => !!t)
  }
}

function getMethod(verbs: ConfigBase["verbs"], file: string) {
  const method = file.replace(/\.[jt]s/, "")
  if (verbs?.includes(method as HTTPMethod)) {
    return method
  } else {
    return null
  }
}
