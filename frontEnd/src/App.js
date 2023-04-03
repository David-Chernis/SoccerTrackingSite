import './App.css';
import Navbar from './Navbar'
import LeagueView from './LeagueView/LeagueView'
import TeamView from './TeamView/TeamView'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useState } from 'react';
import PlayerView from './PlayerView/PlayerView';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Arsenal from './images/Arsenal.png'
import Wenger from './images/Wenger.jpg'

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

  const [teamData, setTeamData] = useState({
    team_name: 'Arsenal F.C.',
    team_code: 'AFC',
    image_path: Arsenal,
    founded: 1886,
    coach_name: 'Ars\u00E8ne Wenger',
    coach_image_path: Wenger,
    goals_scored_count: 76,
    goals_scored_avg: 2,
    goals_conceded_count: 38,
    goals_condeded_avg: 1 
  })

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
              <Route index element={
                <LeagueView/>
              }/>
              <Route path='teams' element={
                <TeamView data={teamData}/>
              }/>
              <Route path='player/:id' element={
                <PlayerView />
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}


export default App;
