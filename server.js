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
    const { homeTeam1, awayTeam1, homeTeam2, awayTeam2 } = req.query;
    try {
      const teams = await queries.match_games(homeTeam1, awayTeam1, homeTeam2, awayTeam2);
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
  


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});