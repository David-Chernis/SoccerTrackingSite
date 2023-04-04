import {Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

export default function TopRatedTeams() {
    const [rows, setRows] = useState([]);

    function loadRows() {
        fetch("http://localhost:8000" + '/TopTeamPlayer/TeamsRating', {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data)=>{
            setRows(data)
        })
    }

    useEffect(loadRows,[])

    return (
        <Table stickyHeader={true} sx={{
            marginTop:'10px'
        }}>
            <TableHead>
                <TableRow sx={{
                    bgcolor:'primary.main',

                    '& th, & td': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    }
                }}>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Average Rating</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow sx={{
                        bgcolor:'primary.main',
                        '& th, & td': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            border: 0
                        }
                    }}>
                        <TableCell>
                            <img src={row.team_image_path} height='50px' alt={row.team_name} style={{
                                borderRadius: '25px'
                            }}/>
                        </TableCell>
                        <TableCell>{row.team_name}</TableCell>
                        <TableCell>{row.average_rating.toFixed(3)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
