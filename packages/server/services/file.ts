import path from "path"
import walk from "rs-filewalk"
import Config from "../config"
import sortAlpha from "../helpers/sortAlpha"
import parseWalk from "../helpers/parseWalk"
import params from "../helpers/params"
import { List } from "@mockapiserver/types/List"
import { Mock } from "@mockapiserver/types/Mock"

export default class FileService {
  constructor(private config: Config) {}

  async get(url: string): Promise<Mock> {
    const bob = require(
      path.join(this.config.get().base.location, pathname, filename)
    )

    // url = params.toFolder(url)
    // var files = parseWalk(
    //   this.config.get().verbs,
    //   walk(path.join(this.config.get().base.location, url))
    // )

    // var obj = {}
    // this.config.get().verbs.forEach(function (verb) {
    //   obj[verb] = []
    // })

    // files.forEach(function (file) {
    //   file.folder = url
    //   obj[file.method].push(file)
    // })

    // Object.keys(obj).forEach(function (key) {
    //   sortAlpha(obj[key], "filename")
    // })

    return {} as Mock
  }

  async list(): Promise<List> {
    return {
      routes: [],
      verbs: [],
    }
  }

  async update(method: string, data: Mock) {}

  async useFile(filename: string) {}
}
