import axios from "axios"

import { List } from "@mockapiserver/types/List"
import { Presets } from "@mockapiserver/types/Get"

const URL = "http://localhost:8080/portal/api"

class API {
  async list() {
    const res = await axios.get<List>(URL)

    return res.data
  }

  async getPresets(url: string) {
    const res = await axios.get<Presets>(URL, { params: { url } })

    return res.data
  }

  async update(data: any) {
    await axios.post(URL, data)

    return this.list()
  }
}

const api = new API()

export default api
