const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mainPage = require("./queries/mainPage.js");
const playerPage = require("./queries/queriesPlayerPage.js");
const teamPage = require("./queries/queriesTeamPage.js");
const topPlayersTeams = require("./queries/topPlayersTeams.js");

app.use(cors());
app.use(bodyParser.json());

app.get("/searchBar", async (req, res) => {
    const input = req.query.input;
    try {
        const player_teams = await mainPage.searchbar_players_teams(input);
        console.log(player_teams)
        res.json(player_teams);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching for players and teams.");
    }
  });

app.get("/standings", async (req, res) => {
  const week = req.query.week;
  try {
    const standings = await mainPage.get_weekly_results(week);
    res.send(standings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving standings data.");
  }
});

app.get('/miniGame', async (req, res) => {
    const home1 = req.query.home1;
    const home2 = req.query.home2;
    const away1 = req.query.away1;
    const away2 = req.query.away2;
    try {
      const teams = await mainPage.match_games(home1, away1, home2, away2);
      console.log(teams)
      res.send(teams);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching for matching teams.");
    }
  });

  app.get('/Player/:id', async (req, res) => {
    console.log("in the get");
    const playerId = req.params.id;
    try {
      const player = await playerPage.getPlayerStats(playerId);
      console.log(player)
      res.json(player);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving player with id ${playerId}.`);
    }
  });

  const Joi = require('joi');

  const updatePlayerSchema = Joi.object({
    team_id: Joi.number().required(),
    player_id: Joi.number().required(),
    nationality: Joi.string().required(),
    display_name: Joi.string().required(),
    image_path: Joi.string().required(),
    player_height: Joi.number().required(),
    player_weight: Joi.number().required(),
    date_of_birth: Joi.date().required(),
    yellow_cards: Joi.number().required(),
    avg_rating: Joi.number().required(),
    position_name: Joi.string().valid('Attacker', 'Midfielder', 'Defender', 'Goalkeeper').required(),
    nationality_image_path: Joi.string().required(),
  
    // Add conditionals for each position
    total_goals: Joi.when('position_name', {
      is: 'Attacker',
      then: Joi.number().required()
    }),
    shots_on_target: Joi.when('position_name', {
      is: 'Attacker',
      then: Joi.number().required()
    }),
    total_tackles: Joi.when('position_name', {
      is: 'Midfielder',
      then: Joi.number().required()
    }),
    interceptions: Joi.when('position_name', {
      is: 'Midfielder',
      then: Joi.number().required()
    }),
    clearances: Joi.when('position_name', {
      is: 'Midfielder',
      then: Joi.number().required()
    }),
    assists: Joi.when('position_name', {
      is: 'Defender',
      then: Joi.number().required()
    }),
    accurate_passes: Joi.when('position_name', {
      is: 'Defender',
      then: Joi.number().required()
    }),
    saves: Joi.when('position_name', {
      is: 'Goalkeeper',
      then: Joi.number().required()
    }),
    goals_conceded: Joi.when('position_name', {
      is: 'Goalkeeper',
      then: Joi.number().required()
    })
  });
  
  app.post('/Player/:id', async (req, res) => {
    console.log("in the post");
    const playerId = req.params.id;
    const { error, value } = updatePlayerSchema.validate(req.body);
    
    if (error) {
      console.error(error);
      res.status(400).send(`Invalid request body: ${error.message}`);
      return;
    }
  
    try {
      const response = await playerPage.updatePlayer(
        value.team_id, 
        playerId, 
        value.nationality, 
        value.display_name, 
        value.image_path, 
        value.player_height, 
        value.player_weight, 
        value.date_of_birth, 
        value.yellow_cards,
        value.avg_rating,
        value.position_name,
        value.nationality_image_path
      );
      
      console.log(response);
      res.status(200).send('Player stats updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error adding player with id ${playerId}`);
    }
  });
  
  
  
  app.get('/Team/:id', async (req, res) => {
    const teamId = req.params.id;
    try {
      const team = await teamPage.teamInfo(teamId);
      res.send(team)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving team with id ${teamId}.`);
    }
  })

  app.delete('/Team/:teamId/player/:playerId', async (req, res) => {
    try {
      await teamPage.deletePlayer(req.params.playerId, req.params.teamId);
      res.send(`Player ${req.params.playerId} deleted`);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error deleting player with id ${req.params.playerId}`);
    }
  });

  app.get('/Team/:id/roster', async (req, res) => {
    const teamId = req.params.id;
    try {
      const players = await teamPage.playersByTeam(teamId);
      res.send(players)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving players of team with id ${teamId}`);
    }
  })

  app.get('/TopTeamPlayer/PlayersRating', async (req, res) => {
    try {
      const players = await topPlayersTeams.top_rated_players();
      res.send(players)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving players of team with id ${teamId}`);
    }
  })

  app.get('/Team/:id/matches', async (req, res) => {
    const teamId = req.params.id;
    try {
      const matches = await teamPage.matchesByTeam(teamId);
      res.send(matches)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving matches of team with id ${teamId}`);
    }
  })


  app.get('/TopTeamPlayer/TeamsRating', async (req, res) => {
    try {
      const teams = await topPlayersTeams.top_rated_teams();
      res.send(teams)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving players of team with id ${teamId}`);
    }
  })

  app.get('/TopTeamPlayer/TopGoalsScored', async (req, res) => {
    try {
      const teams = await topPlayersTeams.top_teams_average_scoring();
      res.send(teams)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving players of team with id ${teamId}`);
    }
  })

  app.get('/TopTeamPlayer/TopGoalsConceded', async (req, res) => {
    try {
      const teams = await topPlayersTeams.top_teams_average_conceeded();
      res.send(teams)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving players of team with id ${teamId}`);
    }
  })

  const addPlayerSchema = Joi.object({
    id: Joi.number().required(),
    nationality: Joi.string().required(),
    display_name: Joi.string().required(),
    player_height: Joi.number().required(),
    player_weight: Joi.number().required(),
    date_of_birth: Joi.date().required(),
    yellow_cards: Joi.number().required(),
    position: Joi.string().valid('Attacker', 'Defender', 'Midfielder', 'Goalkeeper').required(),
    total_goals: Joi.when('position', { is: 'Attacker', then: Joi.number().required() }),
    shots_on_target: Joi.when('position', { is: 'Attacker', then: Joi.number().required() }),
    total_tackles: Joi.when('position', { is: 'Defender', then: Joi.number().required() }),
    interceptions: Joi.when('position', { is: 'Defender', then: Joi.number().required() }),
    clearances: Joi.when('position', { is: 'Defender', then: Joi.number().required() }),
    assists: Joi.when('position', { is: 'Midfielder', then: Joi.number().required() }),
    accurate_passes: Joi.when('position', { is: 'Midfielder', then: Joi.number().required() }),
    saves: Joi.when('position', { is: 'Goalkeeper', then: Joi.number().required() }),
    goals_conceded: Joi.when('position', { is: 'Goalkeeper', then: Joi.number().required() })
  });
  
  
  app.post('/Team/:id/addPlayer', async (req, res) => {
    const player = req.body;
    const player_image = 'https://cdn.sportmonks.com/images/soccer/placeholder.png';
    const flag_image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Empty_flag.svg/2560px-Empty_flag.svg.png';
  
    try {
      const validatedPlayer = await addPlayerSchema.validateAsync(player);
      await teamPage.insertPlayer(
        req.params.id,
        validatedPlayer.id,
        validatedPlayer.nationality,
        validatedPlayer.display_name,
        player_image,
        validatedPlayer.player_height,
        validatedPlayer.player_weight,
        validatedPlayer.date_of_birth,
        validatedPlayer.yellow_cards,
        8.5,
        validatedPlayer.position_name,
        flag_image
      );
  
      if (validatedPlayer.position === 'Attacker') {
        await teamPage.insertAttacker(
          validatedPlayer.id,
          validatedPlayer.total_goals,
          validatedPlayer.shots_on_target,
          req.params.id
        );
      } else if (validatedPlayer.position === 'Defender') {
        await teamPage.insertDefender(
          validatedPlayer.id,
          validatedPlayer.total_tackles,
          validatedPlayer.interceptions,
          validatedPlayer.clearances,
          req.params.id
        );
      } else if (validatedPlayer.position === 'Midfielder') {
        await teamPage.insertMidfielder(
          validatedPlayer.id,
          validatedPlayer.assists,
          validatedPlayer.accurate_passes,
          req.params.id
        );
      } else if (validatedPlayer.position === 'Goalkeeper') {
        await teamPage.insertGoalkeeper(
          validatedPlayer.id,
          validatedPlayer.saves,
          validatedPlayer.goals_conceded,
          req.params.id
        );
      }
  
      res.send('Added new player!');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Bad request: ${error.message}`);
    }
  });
  

  
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});