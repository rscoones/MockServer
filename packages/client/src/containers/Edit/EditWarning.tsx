import React from "react"
import { Mock } from "@mockapiserver/types/Mock"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { CodeBlock, dracula } from "react-code-blocks"

type EditWarningOnChange = (editting: boolean) => void

interface Props {
  mock: Mock
  onChange: EditWarningOnChange
}

const EditWarning: React.FC<Props> = ({ mock, onChange }) => {
  return (
    <div>
      <Box marginY={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              This mock is a{" "}
              <pre style={{ display: "inline" }}>{mock.mockServerType}</pre>.
              Editing it will make it become stateless and you may lose
              functionality.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CodeBlock
              text={mock.raw}
              language="typescript"
              showLineNumbers={false}
              theme={dracula}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box display="flex" flexDirection={"row-reverse"}>
        <Button onClick={() => onChange(true)}>Edit anyway</Button>
      </Box>
    </div>
  )
}

export default EditWarning
