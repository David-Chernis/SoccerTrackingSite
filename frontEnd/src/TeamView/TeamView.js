import './TeamView.css'
import Roster from './Roster'
import Arsenal from '../images/Arsenal.png'

import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';

export default function TeamView() {
    return (
        <Container maxWidth='false' sx={{
            maxWidth:'1500px',
            paddingTop:'50px'
        }}>
            <TeamHeader/>
            <Roster/>
        </Container>
    );
}

function TeamHeader() {
    const theme = useTheme().palette.secondary.contrastText;
    return (
        <Container className='Team-Header' maxWidth='false' disableGutters={true} sx={{
            display:'flex',
            bgcolor: 'secondary.main'
        }}>
            <img src={Arsenal} alt='Arsenal' width='125px' height='125px'/>
            <div style={{ flexGrow:1 }}>
                <h1 className='Team-Text' style={{
                    color: theme
                }}>
                    Arsenal F.C.
                </h1>
                <h2 className='City-Text' style={{
                    color: theme
                }}>London, England</h2>
            </div>
        </Container>
    );
}