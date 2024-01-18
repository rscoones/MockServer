import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { List } from "@mockapiserver/types/List"
import ListItem from "./ListItem"

interface Props {
  data: List
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>Available URLs</Typography>
          </TableCell>
          {data.verbs.map((verb) => (
            <TableCell key={verb}>
              <Typography>{verb}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.routes.map((item) => (
          <ListItem key={item.url} item={item} verbs={data.verbs} />
        ))}
      </TableBody>
    </Table>
  )
}

export default List
