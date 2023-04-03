import './LeagueView.css'
import WeekSelector from './WeekSelector'
import Standings from './Standings'
import PremierLeague from '../images/Premier-League-Logo.png'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import Leicester from '../images/Leicester_City.png'
import Arsenal from '../images/Arsenal.png'
import Tottenham from '../images/Tottenham.png'

function createRowLeague(logo, name, abbr, W, D, L, PTS) {
    return {logo, name, abbr, W, D, L, PTS}
}

var startingRows = [
    createRowLeague(Leicester, 'Leicester City', 'LEI', 23, 12, 3, 81),
    createRowLeague(Arsenal, 'Arsenal', 'AFC', 20, 11, 7, 71),
    createRowLeague(Tottenham, 'Tottenham Hotspur', 'TOT', 19, 13, 6, 70)
]

export default function LeagueView() {
    const [rows, setRows] = useState(startingRows)

    function getStandings(week) {
        fetch("http://8e10-128-189-202-180.ngrok.io/standings?week=" + week, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    return(
        <Container className='LeagueView' maxWidth='false' sx={{
            maxWidth:'1500px',
            paddingTop:'50px'
        }}>
            <LeagueHeader/>
            <WeekSelector getStandings={getStandings}/>
            <Standings rows={rows}/>
        </Container>
    );
}

function LeagueHeader() {
    const theme = useTheme().palette.secondary.contrastText;
    return (
        <Container className='League-Header' maxWidth='false' disableGutters={true} sx={{
            display:'flex',
            bgcolor: 'secondary.main'
        }}>
            <img src={PremierLeague} alt='Premier League' width='125px' height='125px'/>
            <div style={{ flexGrow:1 }}>
                <h1 className='League-Text' style={{
                    color: theme
                }}>
                    Premier League
                </h1>
                <h2 className='Country-Text' style={{
                    color: theme
                }}>England</h2>
            </div>
            <h1 className='Date-Text' style={{
                color: theme
            }}>
                2015 <br className='Date-Break'/>- 16
            </h1>
        </Container>
    );
}