import React, { useState } from "react"
import qs from "qs"
import { List } from "@mockapiserver/types/List"
import Fields from "./Form"
import fetchPresets from "../../hooks/presets"
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material"
import Presets from "./fields/Presets"
import Form from "./Form"
import { Mock } from "@mockapiserver/types/Mock"

export type OnMockChange = (mock: Mock) => void

interface Props {
  data: List
  refetch: () => Promise<void>
}

const Edit: React.FC<Props> = (props) => {
  const query = qs.parse(window.location.search.replace("?", ""))
  const route = props.data.routes.find((t) => t.url === query.url)!

  const [verb, setVerb] = useState("GET")
  const [mock, setMock] = useState(route[verb])
  const [presets] = fetchPresets(route.url)

  const handlePreset: OnMockChange = (mock) => {
    setMock(mock)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          <pre>{route.url}</pre>
        </Typography>

        <Stack direction="row" spacing={1} marginBottom={2}>
          {Object.keys(route).map(
            (item) =>
              props.data.verbs.includes(item) && (
                <Chip
                  onClick={() => {
                    setVerb(item)
                    setMock(route[item])
                  }}
                  label={item}
                  variant={item === verb ? "outlined" : "filled"}
                />
              )
          )}
        </Stack>
        <Presets
          presets={presets.data[verb]}
          mock={mock}
          onChange={handlePreset}
        />
        <hr />
        <Form mock={mock} onChange={setMock} />
      </CardContent>
    </Card>
  )
}

export default Edit
