import {Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Cech from '../images/cech.jpg'
import Ozil from '../images/ozil.jpg'
import Giroud from '../images/giroud.jpg'

function createRowTeam(pic, name, position, nationality, birthday, height, weight, yellows) {
    return {pic, name, position, nationality, birthday, height, weight, yellows}
}

const rows = [
    createRowTeam(Cech, 'Petr Cech', 'GK', 'Czech', ' ', ' ', ' ', ' '),
    createRowTeam(Ozil, 'Mesut Ozil', 'MF', 'German', ' ', ' ', ' ', ' '),
    createRowTeam(Giroud, 'Olivier Giroud', 'FW', 'French', ' ', ' ', ' ', ' ')
]

export default function Roster() {
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
                        }
                    }}>
                        <TableCell>
                            <img src={row.pic} height='50px' alt={row.name} style={{
                                borderRadius: '25px'
                            }}/>
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>{row.nationality}</TableCell>
                        <TableCell>{row.birthday}</TableCell>
                        <TableCell>{row.height}</TableCell>
                        <TableCell>{row.weight}</TableCell>
                        <TableCell>{row.yellows}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
