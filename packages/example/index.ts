import express from "express"
import MockServer from "@mockapiserver/server"
import path from "path"
import { HTTPMethod } from "@mockapiserver/types/List"

const app = express()

new MockServer(app, {
  base: {
    url: "/api",
    location: path.join(__dirname, "../../packages/example/api"),
  },
  ui: {
    url: "/portal",
    location: path.join(__dirname, "../ui"),
  },
  verbs: [HTTPMethod.GET, HTTPMethod.POST],
  session: {
    secret: "bob",
  },
})

app.listen(1337, () => {
  console.log("yup")
})
