import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import qs from "qs"
import { Mock } from "@mockapiserver/types/Mock"
import { List } from "@mockapiserver/types/List"
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material"
import fetchPresets from "../../hooks/presets"
import api from "../../services/api"
import Presets from "./fields/Presets"
import Form from "./Form"

export type OnMockChange = (mock: Mock) => void

interface Props {
  data: List
  refetch: () => Promise<void>
}

const Edit: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const query = qs.parse(window.location.search.replace("?", ""))
  const route = props.data.routes.find((t) => t.url === query.url)!

  const [verb, setVerb] = useState("GET")
  const [mock, setMock] = useState(route[verb])
  const [presets] = fetchPresets(route.url)

  const handlePreset: OnMockChange = (mock) => {
    setMock(mock)
  }

  const handleSubmit = async () => {
    await api.update(route.url, verb, mock)
    navigate("/")
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          <pre>{route.url}</pre>
        </Typography>

        <Box
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <Stack direction="row" spacing={1}>
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
          <hr style={{ marginTop: 20, marginBottom: 20 }} />
          <Presets
            presets={presets.data[verb]}
            mock={mock}
            onChange={handlePreset}
          />
          <hr style={{ marginTop: 20, marginBottom: 20 }} />
        </Box>
        <Form mock={mock} onChange={setMock} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  )
}

export default Edit
