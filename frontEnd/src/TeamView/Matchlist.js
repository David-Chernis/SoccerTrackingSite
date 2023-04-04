import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Matchlist() {
    const [matches, setMatches] = useState([{
        home_image_path: '',
        home_team_code: '',
        home_team_score: '',
        away_image_path: '',
        away_team_code: '',
        away_team_score: ''
    }])

    function loadMatches() {
        fetch("http://localhost:8000" + window.location.pathname + '/matches', {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data)=>{
            setMatches(data)
        })
    }

    useEffect(loadMatches,[])

    return(
        <Table sx={{marginTop:'10px'}}>
            <TableBody>
                <TableRow sx={{
                    bgcolor:'primary.main',
                    '& th, & td': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        border: 0,
                        textAlign: 'center'
                    }
                }}>
                    <TableCell>
                        <h1 style={{
                            fontSize:'3em',
                            margin:'10px 0px 0px 0px'
                        }}>Match History</h1>
                    </TableCell>
                </TableRow>
                {matches.map((match) => (
                    <TableRow sx={{
                        bgcolor:'primary.main',
                        '& th, & td': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            border: 0,
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                        },
                        '& th p, & td p': {
                            margin:0,
                            fontSize: '15px'
                        }
                    }}>
                        <TableCell>
                            <img height='40px' src={match.home_image_path} alt={match.home_team_code}/>
                            <p>
                                {match.home_team_code} &nbsp;&nbsp;&nbsp; {match.home_team_score} &mdash; {match.away_team_score} &nbsp;&nbsp;&nbsp;
                            </p>
                            <img height='40px' src={match.away_image_path} alt={match.away_team_code}/>
                            <p>
                                {match.away_team_code}
                            </p>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}