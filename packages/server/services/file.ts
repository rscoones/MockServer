import path from "path"
import walk from "rs-filewalk"
import Config from "../config"
import parseWalk from "../helpers/parseWalk"
import params from "../helpers/params"
import { HTTPMethod, List } from "@mockapiserver/types/List"
import { Mock, MockLike } from "@mockapiserver/types/Mock"
import { Presets } from "@mockapiserver/types/Presets"

export default class FileService {
  constructor(private config: Config) {}

  get(method: HTTPMethod, url: string): MockLike {
    let p
    if (!url.includes(path.join(this.config.get().base.location))) {
      p = path.join(path.join(this.config.get().base.location), url, method)
    } else {
      p = path.join(url, method)
    }
    return require(p)
  }

  getPreset(url: string, filename: string): MockLike {
    return require(path.join(this.config.get().base.location, url, filename))
  }

  async presetsForUrl(url: string): Promise<Presets> {
    const obj: Presets = this.config.get().verbs.reduce((prev, current) => {
      return {
        ...prev,
        [current]: [],
      }
    }, {})

    const folder = params.toFolder(url)
    const files = parseWalk(
      this.config.get().verbs,
      walk(path.join(this.config.get().base.location, folder))
    )

    files.forEach(function (file) {
      file.folder = folder
      obj[file.method].push(file)
    })

    return obj
  }

  async list(routes: string[]): Promise<List> {
    return {
      routes: [],
      verbs: this.config.get().verbs,
    }
  }
}
