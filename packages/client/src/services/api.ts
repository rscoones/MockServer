import axios from "axios"
import { List } from "@mockapiserver/types/List"
import { Presets } from "@mockapiserver/types/Get"
import { Mock } from "@mockapiserver/types/Mock"

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

  async update(route: string, method: string, data: Mock) {
    const payload = {
      url: route,
      method,
      data: JSON.stringify(data),
    }
    await axios.post(URL, payload)

    return this.list()
  }
}

const api = new API()

export default api
