import { HTTPMethod } from "./List"
import { Mock } from "./Mock"

export interface Presets extends HTTPMethodPresetItem {}

export type HTTPMethodPresetItem = {
  [key in HTTPMethod]?: PresetItem
}

export interface PresetItem {
  data: Mock
  filename: string
  folder: string
  method: string
}
