import { MockLike } from "@mockapiserver/types/Mock"

export default class CacheService {
  private cache: { [key: string]: { [key: string]: MockLike } }

  constructor() {
    this.cache = {}
  }

  async get(sessionId: string, key: string) {
    return this.cache[sessionId][key]
  }

  async set(sessionId: string, key: string, data: MockLike) {
    this.cache[sessionId][key] = data
  }
}
