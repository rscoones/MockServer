import { ListRoute } from "@mockapiserver/types/List"
import React from "react"
import ListItemTick from "./ListItemTick"
import { Link as RouterLink } from "react-router-dom"
import { TableCell, TableRow } from "@mui/material"
import Link from "@mui/material/Link"

interface Props {
  item: ListRoute
  verbs: string[]
}

const ListItem: React.FC<Props> = (props) => {
  return (
    <TableRow>
      <TableCell>
        <RouterLink to={`/edit?url=${props.item.url}`}>
          <Link>{props.item.url}</Link>
        </RouterLink>
      </TableCell>
      {props.verbs.map((verb) => (
        <TableCell key={verb}>{props.item[verb] && <ListItemTick />}</TableCell>
      ))}
    </TableRow>
  )
}

export default ListItem
