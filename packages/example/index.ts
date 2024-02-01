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
})

app.listen(1337, () => {
  console.log("yup")
})
