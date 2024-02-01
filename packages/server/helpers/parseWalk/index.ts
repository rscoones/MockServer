import { Config } from "@mockapiserver/types/Config"
import { File } from "@mockapiserver/types/FileWalk"
import { PresetItem } from "@mockapiserver/types/Presets"
import path from "path"
import sortAlpha from "../sortAlpha"
import { parseMock } from "../respond"

export default function parseWalk(verbs: Config["verbs"], files: File[]) {
  const arr: PresetItem[] = []
  sortAlpha(files, "file").forEach(function (file) {
    addFile(arr, verbs, file)
  })

  return arr
}

function addFile(arr: PresetItem[], verbs: Config["verbs"], file: File) {
  const method = verbs.find((t) => {
    return file.file.includes(t)
  })

  // have method and file is current folder only, rs-filewalk should support depth maybe?
  if (method && file.folder.replace(file.base, "") === "") {
    const filename = file.file.replace(".js", "")

    let data = require(path.join(file.folder, filename))
    // @todo: this may break, need a real request really
    data = parseMock(data, {} as Request)

    arr.push({
      filename: filename,
      folder: file.folder,
      method: method,
      data: data,
    })
  }
}
