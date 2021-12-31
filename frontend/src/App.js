import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './themes';
import { CssBaseline, Box } from '@mui/material'
import Navigation from './components/Navigation'
import Chat from './screens/Chat'
import Room from './screens/Room'
import Login from './screens/Login'

function Main() {
  return (
    <Box component='main' display='flex' sx={{ flexWrap: 'wrap', alignItems: 'stretch', height: '100vh' }}>
      <Box sx={{ flex: '60px 0 0' }}>
        <Navigation />
      </Box>
      <Box sx={{ flex: '220px 1 1' }}>
        <Room />
      </Box>
      <Box sx={{ flex: '500px 6 3' }}>
        <Chat />
      </Box>
    </Box>
  )
}
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Main/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
