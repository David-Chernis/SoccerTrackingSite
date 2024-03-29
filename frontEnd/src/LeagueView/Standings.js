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
                        },
                        '& th a, & td a': {
                            color: 'primary.contrastText',
                            textDecoration: 'none!important'
                        }
                    }}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell className='Name-Cell'>
                            <a href={window.location.origin + '/Team/' + row.team_id}>
                                <div className='Logo-Div'>
                                    <img src={row.image_path} alt='Logo' height='20px'/>
                                </div>
                                {row.team_name}
                            </a>
                        </TableCell>
                        <TableCell className='Abbr-Cell'>
                            <a href={window.location.origin + '/Team/' + row.team_id}>
                                <div className='Logo-Div'>
                                    <img src={row.image_path} alt='Logo' height='20px'/>
                                </div>
                                {row.team_code}
                            </a>
                        </TableCell>
                        <TableCell>{Number(row.total_wins) + Number(row.total_draws) + Number(row.total_losses)}</TableCell>
                        <TableCell>{row.total_wins}</TableCell>
                        <TableCell>{row.total_draws}</TableCell>
                        <TableCell>{row.total_losses}</TableCell>
                        <TableCell>{row.total_points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}