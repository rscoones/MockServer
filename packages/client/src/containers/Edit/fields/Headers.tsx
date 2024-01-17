import React, { useEffect, useState } from "react"
import { Mock } from "@mockapiserver/types/Mock"

import TextField from "@mui/material/TextField"
import { Box, FormControl } from "@mui/material"
import { OnMockChange } from ".."

interface Props {
  mock: Mock
  onChange: OnMockChange
}

const Headers: React.FC<Props> = ({ mock, onChange }) => {
  const [headers, setHeaders] = useState("")

  useEffect(() => {
    setHeaders(JSON.stringify(mock.headers))
  }, [mock.headers])

  return (
    <FormControl fullWidth>
      <TextField
        label="Headers"
        multiline
        minRows={2}
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        onBlur={(e) => onChange({ ...mock, headers: JSON.parse(headers) })}
      />
    </FormControl>
  )
}

export default Headers
