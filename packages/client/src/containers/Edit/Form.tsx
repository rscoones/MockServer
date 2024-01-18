import React, { useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Mock, MockServerType } from "@mockapiserver/types/Mock"
import Json from "./fields/JSON"
import EditWarning from "./EditWarning"
import { OnMockChange } from "."

interface Props {
  mock: Mock
  onChange: OnMockChange
  onSubmit: () => void
}

const Form: React.FC<Props> = ({ mock, onChange, onSubmit }) => {
  const navigate = useNavigate()
  const [editting, setEditting] = useState(false)
  if (!editting && mock.mockServerType === MockServerType.function) {
    return <EditWarning mock={mock} onChange={(val) => setEditting(val)} />
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        autoComplete="off"
      >
        <Json
          label="Headers"
          mockKey="headers"
          mock={mock}
          onChange={onChange}
        />
        <TextField
          sx={{ m: 1, width: "49ch" }}
          label="Status"
          type="number"
          value={mock.status}
        />
        <TextField
          sx={{ m: 1, width: "49ch" }}
          label="Content-Type"
          type="string"
          value={mock.contentType}
        />
        <Json label="Body" mockKey="body" mock={mock} onChange={onChange} />

        <hr style={{ marginTop: 20, marginBottom: 20 }} />
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{ marginRight: 2 }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Form
