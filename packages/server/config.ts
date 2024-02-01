import path from "path"
import { Config as ConfigBase, ConfigUI } from "@mockapiserver/types/Config"
import { HTTPMethod } from "@mockapiserver/types/List"

interface C extends Omit<Required<ConfigBase>, "ui"> {
  ui: Required<ConfigUI>
}

export default class Config {
  constructor(private config: ConfigBase) {
    this.addDefaults()
    this.validate()
  }

  get(): C {
    return JSON.parse(JSON.stringify(this.config))
  }

  set(cfg: ConfigBase) {
    const c: ConfigBase = { ...this.config, ...cfg }
    this.addDefaults(c)
    this.validate(c)
    this.config = c
  }

  private addDefaults(config = this.config) {
    if (!config.session) {
      config.session = { secret: "bob" }
    }

    // ui
    if (!config.ui) {
      config.ui = {}
    }
    if (!config.ui.url) {
      config.ui.url = "/portal"
    }
    if (!config.ui.location) {
      config.ui.location = path.join(__dirname, "../ui")
    }

    // verbs
    if (!config.verbs || config.verbs.length === 0) {
      config.verbs = [
        HTTPMethod.GET,
        HTTPMethod.POST,
        HTTPMethod.PUT,
        HTTPMethod.DELETE,
      ]
    }
  }

  private validate(config = this.config) {
    // @todo
  }
}
