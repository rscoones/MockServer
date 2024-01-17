import React from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import List from "./containers/List"
import Edit from "./containers/Edit"
import fetchList from "./hooks/list"
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"

interface Props {}

const theme = createTheme()

const App: React.FC<Props> = (props) => {
  const [{ data, isLoading, error }, refetch] = fetchList()

  const navigate = useNavigate()

  if (isLoading) {
    return "loading..."
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6">MockServer UI</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<List data={data} />} />
          <Route
            path="/edit"
            element={<Edit data={data} refetch={refetch} />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
