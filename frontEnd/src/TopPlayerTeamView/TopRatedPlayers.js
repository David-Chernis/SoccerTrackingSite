import {Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

export default function TopRatedPlayers() {
    const [rows, setRows] = useState([]);

    function loadRows() {
        fetch("http://localhost:8000" + '/TopTeamPlayer/PlayersRating', {
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
                    <TableCell>Nationality</TableCell>
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
                            <img src={row.player_image_path} height='50px' alt={row.display_name} style={{
                                borderRadius: '25px'
                            }}/>
                        </TableCell>
                        <TableCell>{row.display_name}</TableCell>
                        <TableCell>
                            <img src={row.nationality_image_path} height='25px' alt={row.nationality} title={row.nationality}/>
                        </TableCell>
                        <TableCell>{row.avg_rating}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
