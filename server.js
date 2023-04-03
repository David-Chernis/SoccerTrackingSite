const express = require('express');
const cors = require('cors');
const app = express();
const mainPage = require("./queries/mainPage.js");
const playerPage = require("./queries/queriesPlayerPage.js");
const teamPage = require("./queries/queriesTeamPage.js");
const topPlayersTeams = require("./queries/topPlayersTeams.js");

app.use(cors());

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
    const playerId = req.params.id;
    try {
      const player = await playerPage.getPlayerStats(playerId);
      res.send(player);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving player with id ${playerId}.`);
    }
  });


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});