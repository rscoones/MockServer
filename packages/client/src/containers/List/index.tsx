import React from "react"
import ListItem from "./ListItem"
import fetchList from "../../hooks/list"
import { List } from "@mockapiserver/types/List"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

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
