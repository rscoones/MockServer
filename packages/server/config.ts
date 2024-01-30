import { Config as ConfigBase } from "@mockapiserver/types/Config"

export default class Config {
  constructor(private config: ConfigBase) {
    this.addDefaults()
    this.validate()
  }

  get(): ConfigBase {
    return JSON.parse(JSON.stringify(this.config))
  }

  set(cfg: ConfigBase) {
    const c: ConfigBase = { ...this.config, ...cfg }
    this.addDefaults(c)
    this.validate(c)
    this.config = c
  }

  private addDefaults(config = this.config) {}

  private validate(config = this.config) {}
}
