import './LeagueView.css'
import WeekSelector from './WeekSelector'
import Standings from './Standings'
import PremierLeague from '../images/Premier-League-Logo.png'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export default function LeagueView() {
    const [rows, setRows] = useState([{
        image_path: '',
        team_name: '',
        team_code: '',
        total_draws: '',
        total_losses: '',
        total_wins: '',
        total_points: ''
    }])

    function getStandings(week) {
        fetch("http://localhost:8000/standings?week=" + week, {
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
            console.log(data)
            setRows(data)
        }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    useEffect(()=> {
        getStandings(38);
    },[]);

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