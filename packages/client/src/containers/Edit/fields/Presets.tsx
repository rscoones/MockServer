import { PresetItem } from "@mockapiserver/types/Get"
import { Mock } from "@mockapiserver/types/Mock"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React from "react"
import { OnMockChange } from ".."

interface Props {
  presets: PresetItem[]
  mock: Mock
  onChange: OnMockChange
}

const Presets: React.FC<Props> = ({ presets, mock, onChange }) => {
  if (!presets) {
    return null
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="presets">Presets</InputLabel>
      <Select
        labelId="presets"
        label="Presets"
        value={
          presets?.find((t) => JSON.stringify(t.data) === JSON.stringify(mock))
            ?.filename || "none"
        }
        onChange={(e) => {
          const mock = presets.find((t) => t.filename === e.target.value)
          if (mock) {
            onChange(mock.data)
          }
        }}
      >
        <MenuItem value="none"></MenuItem>
        {presets?.map((item) => (
          <MenuItem key={item.filename} value={item.filename}>
            {item.filename}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Presets