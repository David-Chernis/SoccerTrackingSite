import {Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteRounded'

function Roster() {
    const [rows, setRows] = useState([{}])

    function deletePlayer(playerID, name) {
        if(window.confirm('Are you sure you want to delete ' + name + '?')){
            fetch("http://localhost:8000" + window.location.pathname + '/player/' + playerID, {
                method: 'DELETE'
            }).then((response)=>{
                return response.text()
            }).then((data)=>{
                if(data.startsWith('Bad request') || data.startsWith('Error')){
                    alert(data)
                } else {
                    setTimeout(loadRows, 1000)
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }

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
        <div style={{
            display:'flex',
            flexDirection:'column',
            margin:'10px 0px 0px 0px',
            padding:0
        }}>
            <AddButton loadRows={loadRows}/>
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
                        <TableCell>DELETE</TableCell>
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
                            <TableCell>
                                <Button onClick={()=>{deletePlayer(row.player_id, row.display_name)}} sx={{
                                    color:'primary.contrastText'
                                }}>
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function AddButton(props) {
    const [displayTable, setDisplay] = useState('none');

    const [newPlayer, setNewPlayer] = useState({
        id: Math.trunc(Math.random()*10000000) + 6000,
        display_name: '',
        position: 'Attacker',
        date_of_birth: '',
        nationality: '',
        player_height: '',
        player_weight: '',
        yellow_cards: '',

        total_goals: '',
        shots_on_target: '',

        total_tackles: '',
        interceptions: '',
        clearances: '',

        assists: '',
        accurate_passes: '',
        
        saves: '',
        goals_conceded: ''
    })

    function getTableJSX(position) {
        switch(position) {
            case 'Attacker':
                return (
                    <>
                        <TableHead>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                }
                            }}>
                                <TableCell>Goals</TableCell>
                                <TableCell>Shots on Target</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                },

                                '& input': {
                                    maxWidth:'85px'
                                }
                            }}>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'total_goals')}/>
                                </TableCell>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'shots_on_target')}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </>
                );
            
            case 'Midfielder':
                return (
                    <>
                        <TableHead>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                }
                            }}>
                                <TableCell>Tackles</TableCell>
                                <TableCell>Interceptions</TableCell>
                                <TableCell>Clearances</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                },

                                '& input': {
                                    maxWidth:'85px'
                                }
                            }}>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'total_tackles')}/>
                                </TableCell>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'interceptions')}/>
                                </TableCell>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'clearances')}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </>
                );
            
            case 'Defender':
                return (
                    <>
                        <TableHead>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                }
                            }}>
                                <TableCell>Assists</TableCell>
                                <TableCell>Accurate Passes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                },

                                '& input': {
                                    maxWidth:'85px'
                                }
                            }}>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'assists')}/>
                                </TableCell>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'accurate_passes')}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </>
                );
            
            case 'Goalkeeper':
                return (
                    <>
                        <TableHead>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                }
                            }}>
                                <TableCell>Saves</TableCell>
                                <TableCell>Goals Conceded</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{
                                bgcolor:'primary.main',

                                '& th, & td': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                },

                                '& input': {
                                    maxWidth:'85px'
                                }
                            }}>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'saves')}/>
                                </TableCell>
                                <TableCell>
                                    <input onChange={(event)=>handleChange(event, 'goals_conceded')}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </>
                );

            default:
                return (
                    <p color='red'>Please choose a correct value.</p>
                );

        }
    }

    function handleClick() {
        if(displayTable === 'none') {
            setDisplay('table')
        } else {
            setDisplay('none')
        }
    }

    function handleChange(event, attribute) {
        setNewPlayer({...newPlayer, [attribute]: event.target.value})
    }

    function addPlayer() {
        fetch('http://localhost:8000' + window.location.pathname + '/addPlayer', {
            method:'POST',
            body: JSON.stringify(newPlayer),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response)=>{
            return response.text()
        }).then((data)=>{
            if(data.startsWith('Bad request') || data.startsWith('Error')){
                alert(data)
            } else{
                console.log(data)
                setNewPlayer({...newPlayer, ['id']: Math.trunc(Math.random()*10000000) + 6000})
                setTimeout(props.loadRows, 1000)
            }
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <>
        <Button variant='contained' onClick={()=>{handleClick()}} sx={{
            width:'fit-content',
            alignSelf:'left'
        }}>
            Add Player
        </Button>
        <Table sx={{
            display: displayTable
        }}>
            <TableHead>
                <TableRow sx={{
                    bgcolor:'primary.main',

                    '& th, & td': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    }
                }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Nationality</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Yellows</TableCell>
                    <TableCell>ADD</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow sx={{
                    bgcolor:'primary.main',

                    '& th, & td': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    },

                    '& input': {
                        maxWidth:'85px'
                    }
                }}>
                    <TableCell>
                        <input onChange={(event)=>handleChange(event, 'display_name')}/>
                    </TableCell>
                    <TableCell>
                        <select onChange={(event)=>handleChange(event, 'position')}>
                            <option value="Attacker">Attacker</option>
                            <option value="Midfielder">Midfielder</option>
                            <option value="Defender">Defender</option>
                            <option value="Goalkeeper">Goalkeeper</option>
                        </select>
                    </TableCell>
                    <TableCell>
                        <input onChange={(event)=>handleChange(event, 'nationality')}/>
                    </TableCell>
                    <TableCell>
                        <input onChange={(event)=>handleChange(event, 'date_of_birth')}/>
                    </TableCell>
                    <TableCell>
                        <input onChange={(event)=>handleChange(event, 'player_height')}/>
                    </TableCell>
                    <TableCell>
                        <input onChange={(event)=>handleChange(event, 'player_weight')}/>
                    </TableCell>
                    <TableCell>
                        <input onChange={(event)=>handleChange(event, 'yellow_cards')}/>
                    </TableCell>
                    <TableCell>
                        <Button onClick={()=>{addPlayer()}}sx={{
                            color:'primary.contrastText'
                        }}>+</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Table sx={{
            display: displayTable
        }}>
            {getTableJSX(newPlayer.position)}
        </Table>
        </>
    );
}

export default Roster;