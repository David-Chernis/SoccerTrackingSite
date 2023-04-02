import './App.css';
import Navbar from './Navbar'
// import LeagueView from './LeagueView/LeagueView'
import TeamView from './TeamView/TeamView'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

function App() {
  const siteTheme = createTheme({
    palette: {
      primary: {
        // main: '#040428'
        main: '#063672'
        // main: '#00A650'
        // main: '#1C2C5B'
      },
      secondary: {
        // main: '#E20030'
        main: '#DB0007'
        // main: '#FFF200'
        // main: '#6CABDD'
      }
    }
  });

  return (
    <ThemeProvider theme={siteTheme}>
      <Container className='App' disableGutters={true}>
        <Navbar/>
        <TeamView/>
      </Container>
    </ThemeProvider>
  );
}


export default App;
