import './TeamView.css'
import Roster from './Roster'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';

export default function TeamView(props) {
    return (
        <Container className='TeamView' maxWidth='false' sx={{
            maxWidth:'1500px',
            paddingTop:'50px'
        }}>
            <TeamHeader data={props.data}/>
            <Coach data={props.data}/>
            <Roster/>
        </Container>
    );
}

function TeamHeader(props) {
    const theme = useTheme().palette.secondary.contrastText;
    return (
        <Container className='Team-Header' maxWidth='false' disableGutters={true} sx={{
            bgcolor: 'secondary.main'
        }}>
            <img src={props.data.image_path} alt={props.data.team_name} width='125px' height='125px'/>
            <div style={{ flexGrow:1 }}>
                <h1 className='Team-Text' style={{
                    color: theme
                }}>
                    {props.data.team_name}
                </h1>
            </div>
        </Container>
    );
}

function Coach(props) {
    const theme = useTheme().palette.primary.contrastText;
    return (
        <Container maxWidth='false' disableGutters={true} sx={{
            display:'flex',
            bgcolor:'primary.main'
        }}>
            <img src={props.data.coach_image_path} alt={props.data.coach_name} height='200px'/>
            <div style={{ flexGrow: 1}}>
                <h1 className='Coach-Text' style={{
                    color: theme,
                    fontSize: '3em'
                }}>
                    Coach
                </h1>
            </div>
        </Container>
    );
}