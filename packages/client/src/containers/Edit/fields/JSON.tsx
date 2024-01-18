import React, { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import { FormControl } from "@mui/material"
import { Mock } from "@mockapiserver/types/Mock"
import { OnMockChange } from ".."

interface Props {
  label: string
  mockKey: keyof Mock
  mock: Mock
  onChange: OnMockChange
}

const Headers: React.FC<Props> = ({ label, mockKey, mock, onChange }) => {
  const [json, setJson] = useState("")
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setJson(JSON.stringify(mock[mockKey]))
  }, [mock])

  return (
    <FormControl sx={{ m: 1, width: "100ch" }}>
      <TextField
        label={label}
        multiline
        minRows={2}
        value={json}
        error={!!error}
        helperText={error && error.message}
        onChange={(e) => setJson(e.target.value)}
        onBlur={() => {
          setError(null)
          try {
            onChange({ ...mock, [mockKey]: JSON.parse(json) })
          } catch (e) {
            setError(e)
          }
        }}
      />
    </FormControl>
  )
}

export default Headers
