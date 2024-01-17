import React from "react"
import ReactDOM from "react-dom/client"
import App from "./src"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <RouterProvider
    router={createBrowserRouter([
      {
        path: "/*",
        element: <App />,
      },
    ])}
  />
)

// @ts-ignore: handled in build scripts
if (IS_LOCAL) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  )
}
