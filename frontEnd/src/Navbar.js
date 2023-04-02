import './Navbar.css'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import logo from './images/logo.png'
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/SearchRounded';

export default function Navbar() {
    return (
        <AppBar position='static'>
            <Container maxWidth='false' sx={{
                maxWidth: '1500px'
            }}>
                <Toolbar disableGutters>
                    <img src={logo} alt='logo' width='75px' height='75px' style={{
                        margin: '10px 20px 10px 0px'
                    }}/>
                    <SearchBar/>
                    <Button className='Top-Button' variant='contained' sx={{
                        color:'primary.main',
                        bgcolor:'primary.contrastText',
                        '&:hover' : {
                            bgcolor:'primary.contrastText'
                        }
                    }}><strong>Top Players</strong></Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function SearchBar() {
    return (
        <Container className='Search' disableGutters maxWidth='false' sx={{
            display:'flex',
            backgroundColor: 'primary.contrastText',
            border: '2px solid primary.main',
        }}>
            <SearchIcon color='primary' fontSize='large' sx={{
                marginTop: '3px'
            }}/>
            <Input disableUnderline color='primary' placeholder='Search Teams and Players' sx={{
                color:'primary.main', flexGrow: 1, fontWeight: 'bold'
            }}/>
        </Container>
    )
}