const express = require('express');
const cors = require('cors');
const app = express();
const mainPage = require("./queries/mainPage.js");
const  playerPage = require("./queries/queriesPlayerPage.js");
const teamPage = require("./queries/queriesTeamPage.js");
const topPlayersTeams = require("./queries/topPlayersTeams.js");

app.use(cors());

app.get("/searchBar", async (req, res) => {
    const input = req.query.input;
    try {
        const standings = await queries.get_weekly_results(week);
        res.json(standings);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching for players and teams.");
    }
  });

app.get("/standings", async (req, res) => {
  const week = req.query.week;
  try {
    const standings = await queries.get_weekly_results(week);
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});