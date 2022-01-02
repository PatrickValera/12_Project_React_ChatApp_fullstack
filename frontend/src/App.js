import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './themes';
import { CssBaseline, Box } from '@mui/material'
import Navigation from './components/Navigation'
import Chat from './screens/Chat'
import Room from './screens/Room'
import Login from './screens/Login'
import Register from './screens/Register'

function Main() {
  return (
    <Box component='main' display='flex' sx={{ flexWrap: 'wrap', alignItems: 'stretch', height: '100vh',position:'relative' }}>
      {/* <Box sx={{ flex: '60px 0 0',position:{xs:'absolute',md:'relative'}  }}>
        <Navigation />
      </Box> */}
      <Box sx={{ flex: '240px 2 1',position:{xs:'absolute',md:'relative'}  }}>
        <Room />
      </Box>
      <Box sx={{ flex: '500px 6 1' }}>
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
        <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Main/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
