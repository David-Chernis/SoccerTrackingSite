import './App.css';
import Navbar from './Navbar'
import LeagueView from './LeagueView/LeagueView'
import TeamView from './TeamView/TeamView'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const siteTheme = createTheme({
    palette: {
      primary: {
        main: '#040428'
      },
      secondary: {
        main: '#E20030'
      }
    }
  });

  function searchQuery(value, setSearchResults) {
    fetch("http://localhost:8000/searchBar?input=" + value, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        // Assuming the server returns an array of strings with team and player names
        console.log(data)
        setSearchResults(data);
    })
  }

  return (
    <ThemeProvider theme={siteTheme}>
      <Container className='App' disableGutters={true}>
        <Navbar search={searchQuery}/>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index Component={LeagueView}/>
              <Route path='Team/:id' Component={TeamView} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}


export default App;
