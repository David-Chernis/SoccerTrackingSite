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

  app.post('/Player/:id', (req, res) => {
    console.log("in the post");
    const playerId = req.params.id;
    const body = req.body
    try {
      const res = playerPage.updatePlayer(
        body.team_id, 
        playerId, 
        body.nationality, 
        body.display_name, 
        body.image_path, 
        body.player_height, 
        body.player_weight, 
        body.date_of_birth, 
        body.yellow_cards,
        body.avg_rating,
        body.position_name,
        body.nationality_image_path
        );
      console.log(res);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving player with id ${playerId}.`);
    }
  
    res.status(200).send('Player stats updated successfully');
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
  

  
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});