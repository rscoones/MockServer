import { Config } from "@mockapiserver/types/Config"
import { File } from "@mockapiserver/types/FileWalk"
import { PresetItem } from "@mockapiserver/types/Get"
import path from "path"

var parseMock = require("./parseMock")

export default function parseWalk(verbs: Config["verbs"], files: File[]) {
  var arr: PresetItem[] = []
  files.forEach(function (file) {
    addFile(arr, verbs, file)
  })

  return arr
}

function addFile(arr: PresetItem[], verbs: Config["verbs"], file: File) {
  // var method
  // for (var i = 0; i < verbs.length; i++) {
  //   if (file.file.indexOf(verbs[i]) > -1) {
  //     method = verbs[i]
  //     break
  //   }
  // }

  const method = verbs.find((t) => {
    return file.file.includes(t)
  })

  if (method && file.folder.replace(file.base, "") === "") {
    const filename = file.file.replace(".js", "")

    let data = require(path.join(file.folder, filename))
    data = parseMock(data)

    arr.push({
      filename: filename,
      folder: file.folder,
      method: method,
      data: data,
    })
  }
}
