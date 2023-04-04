import './TeamView.css'
import Roster from './Roster'
import Matchlist from './Matchlist'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import Arsenal from '../images/Arsenal.png'
import Wenger from '../images/Wenger.jpg'

export default function TeamView(props) {
    const [data, setData] = useState({
        team_name: 'Arsenal F.C.',
        team_code: 'AFC',
        image_path: Arsenal,
        founded: 1886,
        coach_name: 'Ars\u00E8ne Wenger',
        coach_image_path: Wenger,
        goals_scored_count: 76,
        goals_scored_avg: 2,
        goals_conceded_count: 38,
        goals_conceded_avg: 1,
        cleansheets_count: 11
    })

    function loadData() {
        fetch("http://localhost:8000" + window.location.pathname, {
            method:'GET'
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            setData(data[0])
        })
    }

    useEffect(loadData,[])

    return (
        <Container className='TeamView' maxWidth='false' sx={{
            maxWidth:'1500px',
            paddingTop:'50px'
        }}>
            <TeamHeader data={data}/>
            <TeamStats data={data}/>
            <Coach data={data}/>
            <Roster/>
            <Matchlist/>
        </Container>
    );
}

function TeamHeader(props) {
    return (
        <Container className='Team-Header' maxWidth='false' disableGutters={true} sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText'
        }}>
            <img src={props.data.image_path} alt={props.data.team_name} width='125px' height='125px'/>
            <div style={{ flexGrow:1 }}>
                <h1 className='Team-Text'>
                    {props.data.team_name}
                </h1>
                <h2 className='Founded-Text'>
                    Founded: {props.data.founded}
                </h2>
            </div>
        </Container>
    );
}

function TeamStats(props) {
    return (
        <Container className='TeamStats' maxWidth='false' disableGutters={true} sx={{
            display:'flex',
            flexDirection:'column',
            bgcolor:'primary.main',
            marginBottom:'10px',
            rowGap:'5px',
            color: 'primary.contrastText',
            padding:'20px'
        }}>
            <h1>
                Team Stats
            </h1>
            <p>
                <strong>Goals Scored: </strong> {props.data.goals_scored_count}
            </p>
            <p>
                <strong>Goals Scored Per Game: </strong> {props.data.goals_scored_avg}
            </p>
            <p>
                <strong>Goals Conceded: </strong> {props.data.goals_conceded_count}
            </p>
            <p>
                <strong>Goals Conceded Per Game: </strong> {props.data.goals_conceded_avg}
            </p>
            <p>
                <strong>Clean Sheets: </strong> {props.data.cleansheets_count}
            </p>
        </Container>
    )
}

function Coach(props) {
    const theme = useTheme().palette.primary.contrastText;
    return (
        <Container maxWidth='false' disableGutters={true} sx={{
            display:'flex',
            bgcolor:'primary.main'
        }}>
            <img src={props.data.coach_image_path} alt={props.data.coach_name} height='200px'/>
            <div style={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection:'column',
                justifyContent:'center',
                rowGap:'5px',
                marginLeft:'20px'
            }}>
                <h1 className='Coach-Text' style={{
                    color: theme,
                    fontSize: '2em'
                }}>
                    Coach
                </h1>
                <h1 className='Coach-Name' style={{
                    color: theme,
                    fontSize: '3em'
                }}>
                    {props.data.coach_name}
                </h1>
            </div>
        </Container>
    );
}