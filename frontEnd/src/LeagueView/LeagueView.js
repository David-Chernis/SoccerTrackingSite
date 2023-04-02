import './LeagueView.css'
import WeekSelector from './WeekSelector'
import Standings from './Standings'
import PremierLeague from '../images/Premier-League-Logo.png'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';

export default function LeagueView() {
    return (
        <Container maxWidth='false' sx={{
            maxWidth:'1500px',
            paddingTop:'50px'
        }}>
            <LeagueHeader/>
            <WeekSelector/>
            <Standings/>
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