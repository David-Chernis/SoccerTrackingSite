import './TopTeamPlayer.css'
import TopRatedPlayers from './TopRatedPlayers'
import TopRatedTeams from './TopRatedTeams'
import TopGoalsScored from './TopGoalsScored'
import TopGoalsConceded from './TopGoalsConceded'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import Arsenal from '../images/Arsenal.png'
import Wenger from '../images/Wenger.jpg'

export default function TeamView(props) {
    return (
        <Container className='TeamView' maxWidth='false' sx={{
            maxWidth:'1500px',
            paddingTop:'50px'
        }}>
            <TeamHeader title={"Top Rated Players of 2015/2016 EPL Season"}/>
            <TopRatedPlayers/>
            <TeamHeader title={"Top Rated Teams of 2015/2016 EPL Season"}/>
            <TopRatedTeams/>
            <TeamHeader title={"Teams With Highest Goals Per Match"}/>
            <TopGoalsScored/>
            <TeamHeader title={"Teams With Highest Goals Conceded Per Match"}/>
            <TopGoalsConceded/>
        </Container>
    );
}

function TeamHeader(props) {
    return (
        <Container className='Team-Header' maxWidth='false' disableGutters={true} sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText'
        }}>
            <div style={{ flexGrow:1 }}>
                <h1 className='Team-Text'>
                    {props.title}
                </h1>
            </div>
        </Container>
    );
}

