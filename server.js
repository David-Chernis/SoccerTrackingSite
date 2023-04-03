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
    const playerId = req.params.id;
    try {
      const player = await playerPage.getPlayerStats(playerId);
      res.send(player);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error retrieving player with id ${playerId}.`);
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


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});