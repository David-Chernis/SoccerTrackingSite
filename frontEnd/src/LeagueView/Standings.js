import './Standings.css'
import {Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function Standings(props) {
    return (
        <Table stickyHeader={true} sx={{
            marginTop: '10px'
        }}>
            <TableHead>
                <TableRow sx={{
                    bgcolor:'primary.main',

                    '& th, & td': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    }
                }}>
                    <TableCell>#</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>MP</TableCell>
                    <TableCell>W</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>L</TableCell>
                    <TableCell>PTS</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.map((row, index) => (
                    <TableRow sx={{
                        bgcolor:'primary.main',
                        '& th, & td': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            border: 0
                        }
                    }}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell className='Name-Cell'>
                            <div className='Logo-Div'>
                                <img src={row.logo} alt='Logo' height='20px'/>
                            </div>
                            {row.name}
                        </TableCell>
                        <TableCell className='Abbr-Cell'>
                            <div className='Logo-Div'>
                                <img src={row.logo} alt='Logo' height='20px'/>
                            </div>
                            {row.abbr}
                        </TableCell>
                        <TableCell>{row.W + row.D + row.L}</TableCell>
                        <TableCell>{row.W}</TableCell>
                        <TableCell>{row.D}</TableCell>
                        <TableCell>{row.L}</TableCell>
                        <TableCell>{row.PTS}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}