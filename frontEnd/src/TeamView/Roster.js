import {Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

import Cech from '../images/cech.jpg'
import Ozil from '../images/ozil.jpg'
import Giroud from '../images/giroud.jpg'

import France from '../images/France.png'
import Germany from '../images/Germany.png'
import Czechia from '../images/Czechia.png'

function createRowTeam(image_path, display_name, position_name, nationality, nationality_image_path, date_of_birth, player_height, player_weight, yellow_cards) {
    return {image_path, display_name, position_name, nationality, nationality_image_path, date_of_birth, player_height, player_weight, yellow_cards}
}

export default function Roster() {
    const [rows, setRows] = useState([
        createRowTeam(Cech, 'Petr Cech', 'GK', 'Czech', Czechia, ' ', ' ', ' ', ' '),
        createRowTeam(Ozil, 'Mesut Ozil', 'MF', 'German', Germany, ' ', ' ', ' ', ' '),
        createRowTeam(Giroud, 'Olivier Giroud', 'FW', 'French', France, ' ', ' ', ' ', ' ')
    ])

    function loadRows() {
        fetch("http://localhost:8000" + window.location.pathname + '/roster', {
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
                    <TableCell>Position</TableCell>
                    <TableCell>Nationality</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Yellows</TableCell>
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
                        },
                        '& th a, & td a': {
                            color: 'primary.contrastText',
                            textDecoration: 'none!important'
                        }
                    }}>
                        <TableCell>
                            <img src={row.image_path} height='50px' alt={row.display_name} style={{
                                borderRadius: '25px'
                            }}/>
                        </TableCell>
                        <TableCell>
                            <a href={window.location.origin + '/player/' + row.player_id}>
                                {row.display_name}
                            </a>
                        </TableCell>
                        <TableCell>{row.position_name}</TableCell>
                        <TableCell>
                            <img src={row.nationality_image_path} height='25px' alt={row.nationality} title={row.nationality}/>
                        </TableCell>
                        <TableCell>{row.date_of_birth ? row.date_of_birth.split('T')[0] : ''}</TableCell>
                        <TableCell>{row.player_height}</TableCell>
                        <TableCell>{row.player_weight}</TableCell>
                        <TableCell>{row.yellow_cards}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
