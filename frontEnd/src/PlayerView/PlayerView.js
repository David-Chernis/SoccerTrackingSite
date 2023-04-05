import Joi from 'joi';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/system';
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import './PlayerView.css';

function PlayerView(props) {
  const [player, setPlayer] = useState({});
  const location = useLocation();
  const path = location.pathname;

  const [updatedPlayer, setUpdatedPlayer] = useState({});

  useEffect(() => {
    setUpdatedPlayer(player);
  }, [player]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPlayer({ ...updatedPlayer, [name]: value });
  };


  const playerSchema = Joi.object({
    team_id: Joi.number().required(),
    nationality: Joi.string().required(),
    display_name: Joi.string().required(),
    image_path: Joi.string().required(),
    player_height: Joi.number().required(),
    player_weight: Joi.number().required(),
    date_of_birth: Joi.date().required(),
    yellow_cards: Joi.number().required(),
    avg_rating: Joi.number().required(),
    position_name: Joi.string().required(),
    nationality_image_path: Joi.string().required()
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const validation = playerSchema.validate(updatedPlayer);
  
    if (validation.error) {
      alert(validation.error.details[0].message);
      return;
    }
  
    console.log(updatedPlayer)
    console.log(JSON.stringify(updatedPlayer));
    fetch(`http://localhost:8000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPlayer)
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Player stats updated successfully');
    }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };
  
  function fetchPlayerStats(path) {
    fetch(`http://localhost:8000${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data)
      setPlayer(data);
    }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

  useEffect(() => {
    fetchPlayerStats(path)
  }, []);

  const theme = useTheme().palette.secondary.contrastText;

  return (
    <Container className="PlayerView" maxWidth="false" sx={{ maxWidth: "1500px", paddingTop: "50px" }}>
      <PlayerHeader player={player} theme={theme} />
      <PlayerStats player={player} updatedPlayer={updatedPlayer} handleChange={handleChange} handleSubmit={handleSubmit} />
    </Container>
  );
}

function PlayerHeader({ player, theme }) {
  return (
    <Container className="Player-Header" maxWidth="false" disableGutters={true} sx={{ bgcolor: "secondary.main" }}>
      <img src={player.image_path} alt={player.display_name} width="125px" height="125px" />
      <img className="nationality-flag" src={player.nationality_image_path} alt={player.nationality} width="60px" height="40px" />
      <div style={{ flexGrow: 1 }}>
        <h1 className="Player-Text" style={{ color: theme }}>{player.display_name}</h1>
      </div>
    </Container>
  );
}

function formatDateOfBirth(dateOfBirth) {
  return dateOfBirth ? dateOfBirth.split('T')[0] : '';
}



function PlayerStats({ player, updatedPlayer, handleChange, handleSubmit }) {
  const renderAdditionalStats = (position) => {
    switch (position) {
      case 'Defender':
        return (
          <>
            <TableCell>
                <TextField className = "textfield"  
                  name="total_tackles"
                  value={updatedPlayer.total_tackles}
                  onChange={handleChange}
                />
            </TableCell>
            <TableCell>
                <TextField className = "textfield"  
                  name="interceptions"
                  value={updatedPlayer.interceptions}
                  onChange={handleChange}
                />
            </TableCell>
            <TableCell>
                <TextField className = "textfield"  
                  name="clearances"
                  value={updatedPlayer.clearances}
                  onChange={handleChange}
                />
            </TableCell>
          </>
        );
      case 'Attacker':
        return (
          <>
            <TableCell>
                <TextField className = "textfield"  
                  name="total_goals"
                  value={updatedPlayer.total_goals}
                  onChange={handleChange}
                />
            </TableCell>
            <TableCell>
                <TextField className = "textfield"  
                  name="shots_on_target"
                  value={updatedPlayer.shots_on_target}
                  onChange={handleChange}
                />
            </TableCell>
          </>
        );
      case 'Midfielder':
        return (
          <>
            <TableCell>
                  <TextField className = "textfield"  
                    name="assists"
                    value={updatedPlayer.assists}
                    onChange={handleChange}
                  />
              </TableCell>
              <TableCell>
                  <TextField className = "textfield"  
                    name="accurate_passes"
                    value={updatedPlayer.accurate_passes}
                    onChange={handleChange}
                  />
              </TableCell>
          </>
        );
      case 'Goalkeeper':
        return (
          <>
            <TableCell>
                <TextField className = "textfield"  
                  name="saves"
                  value={updatedPlayer.saves}
                  onChange={handleChange}
                />
            </TableCell>
            <TableCell>
                <TextField className = "textfield"  
                  name="goals_conceded"
                  value={updatedPlayer.goals_conceded}
                  onChange={handleChange}
                />
            </TableCell>
          </>
        );
      default:
        return null;
    }
  };

  const renderAdditionalStatHeaders = (position) => {
    switch (position) {
      case 'Defender':
        return (
          <>
            <TableCell>Total Tackles</TableCell>
            <TableCell>Interceptions</TableCell>
            <TableCell>Clearances</TableCell>
          </>
        );
      case 'Attacker':
        return (
          <>
            <TableCell>Total Goals</TableCell>
            <TableCell>Shots on Target</TableCell>
          </>
        );
      case 'Midfielder':
        return (
          <>
            <TableCell>Assists</TableCell>
            <TableCell>Accurate Passes</TableCell>
          </>
        );
      case 'Goalkeeper':
        return (
          <>
            <TableCell>Saves</TableCell>
            <TableCell>Goals Conceded</TableCell>
          </>
        );
      default:
        return null;
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <Table stickyHeader={true} sx={{ marginTop: '10px' }}>
        {/* Table head */}
        <TableHead>
          <TableRow sx={{
              bgcolor:'primary.main',
              '& th, & td': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText'
              }
          }}>
            <TableCell>Avg. Rating</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Yellow Cards</TableCell>
            {/* Conditional stat headers based on player's position, basically different position tables have diff stats, which we need to conditionally render */}
            {renderAdditionalStatHeaders(player.position_name)}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              bgcolor: 'primary.main',
              '& th, & td': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                border: 0,
              },
            }}
          >
            {/* stats common to all players*/}
            <TableCell>
              <TextField className = "textfield"  
                name="avg_rating"
                value={updatedPlayer.avg_rating}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField className = "textfield"  
                name="date_of_birth"
                value={formatDateOfBirth(updatedPlayer.date_of_birth)}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField className = "textfield"  
                name="player_height"
                value={updatedPlayer.player_height}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField className = "textfield"  
                name="player_weight"
                value={updatedPlayer.player_weight}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField className = "textfield"  
                name="position_name"
                value={updatedPlayer.position_name}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField className = "textfield"  
                name="yellow_cards"
                value={updatedPlayer.yellow_cards}
                onChange={handleChange}
              />
            </TableCell>

            {/* actual conditional stats */}
            {renderAdditionalStats(player.position_name)}
          </TableRow>
        </TableBody>
      </Table>
      <Button
            type = "submit"
            className="Top-Button"
            variant="contained"
            sx={{
              color: "primary.main",
              bgcolor: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.contrastText",
                filter: "invert(0.1)",
              },
            }}
          >
            <strong>Update Player Stats</strong>
        </Button>
    </form>
  );
}

export default PlayerView;
