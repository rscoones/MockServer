import React from "react"
import { Mock } from "@mockapiserver/types/Mock"
import { OnMockChange } from "."
import Headers from "./fields/Headers"

interface Props {
  mock: Mock
  onChange: OnMockChange
}

const Form: React.FC<Props> = ({ mock, onChange }) => {
  return (
    <>
      <Headers mock={mock} onChange={onChange} />
    </>
  )
}

export default Form
