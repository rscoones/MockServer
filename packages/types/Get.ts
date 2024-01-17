import { Mock } from "./Mock"

export interface Presets {
  [key: string]: PresetItem[]
}

export interface PresetItem {
  data: Mock
  filename: string
  folder: string
  method: string
}
