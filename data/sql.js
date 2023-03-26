const axios = require('axios');
const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "Football304!",
  port: "3306",
  database: "cpsc304",
});

//There may be connectivity issues caused by authentication (need to add IP to aws security protocol)

connection.connect(async (err) => {
  //Accessing Teams and Stats Data need to populate and also add coaches
  axios.get('https://api.sportmonks.com/v3/football/teams/seasons/10', {
    params: {
      api_token: 'IFRQw1iBMF72jh5ZjMR5OM73uCrKgx2OYkC0QMgNy2KwwFqffigo8km6ui1r',
      includes: 'coaches;statistics.details.type',
      filters: 'teamStatisticSeasons:10'
    }
  })
  .then(response => {
      //Example of access
      for (let i = 0; i < response.data.length; i++) {
          teamInfo = response["data"]["data"]
          break
      }
  })
  .catch(error => {
      console.log(error);
  });
});

//To populate the Teams Table
async function add_teams_stats(
  team_id,
  team_name,
  team_code,
  image_path,
  founded,
  venue_id,
  coach,
  goals_conceded_count,
  goals_conceded_avg,
  goals_scored_count,
  goals_scored_avg,
  cleansheets_count
) {
return new Promise((resolve, reject) => {
  const sql =
    "INSERT INTO Teams (team_id, team_name, team_code, image_path, founded, venue_id, coach, goals_conceded_count, goals_conceded_avg, goals_scored_count, goals_scored_avg, cleansheets_count) VALUES ?";
  const values = [
    [
      team_id,
      team_name,
      team_code,
      image_path,
      founded,
      venue_id,
      coach,
      goals_conceded_count,
      goals_conceded_avg,
      goals_scored_count,
      goals_scored_avg,
      cleansheets_count,
    ],
  ];
  connection.query(sql, [values], (error, res) => {
    if (error) throw error;
    console.log("Team Added");
    console.log(res)
    resolve("Success");
  });
});
}