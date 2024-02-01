import { HTTPMethod } from "@mockapiserver/types/List"
import { MockLike } from "@mockapiserver/types/Mock"

export default class CacheService {
  private cache: {
    [key: string]: { [method: string]: { [url: string]: MockLike } }
  }

  constructor() {
    this.cache = {}
  }

  async get(sessionId: string, method: HTTPMethod, url: string) {
    return this.cache?.[sessionId]?.[method]?.[url]
  }

  async set(
    sessionId: string,
    method: HTTPMethod,
    url: string,
    data: MockLike
  ) {
    if (!this.cache[sessionId]) {
      this.cache[sessionId] = {}
    }
    if (!this.cache[sessionId][method]) {
      this.cache[sessionId][method] = {}
    }
    this.cache[sessionId][method][url] = data
  }
}
