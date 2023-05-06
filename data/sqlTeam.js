const axios = require('axios');
const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
});

connection.connect(async (err) => {
  axios.get('https://api.sportmonks.com/v3/football/teams/seasons/10', {
    params: {
      api_token: 'aFdq5f6JjNXcsH2ldcGpRvxSw6rqoRAZBeh48Ie4QE2HVO0DKuDwYL5nEoN7',
      includes: 'coaches;statistics.details.type',
      filters: 'teamStatisticSeasons:10'
    }
  })
    .then(async response => {
      // console.log(response["data"]["data"][0].id)

      for (let i = 0; i < response["data"]["data"].length; i++) {
        data = response["data"]["data"][i]
        team_id = data.id
        team_name = data.name
        team_code = data.short_code
        image_path = data.image_path
        coach_id = data.coaches[0].coach_id
        venue_id = data.venue_id
        founded = data.founded
        // console.log(data)

        for (let j = 0; j < data.statistics[0]["details"].length; j++) {
          item = data.statistics[0]["details"][j]
          // console.log(item)
          if (Number(item["type_id"]) == 88) {  // this means goals_conceded

            goals_conceded_count = item["value"]["all"]["count"];
            goals_conceded_avg = item["value"]["all"]["average"];
            // console.log("goals_conceded count: " + goals_conceded_avg)
            // console.log("goals_conceded avg: " + goals_conceded_count)
          }
          if (Number(item["type_id"]) == 52) {  // this means goals_conceded

            goals_scored_count = item["value"]["all"]["count"];
            goals_scored_avg = item["value"]["all"]["average"];
            // console.log("goals scored count: " + goals_scored_count)
            // console.log("goals scored avg: " + goals_scored_avg)
          }
          if (Number(item["type_id"]) == 194) {
            cleansheets_count = item["value"]["all"]["count"];
            // console.log("cleansheets count: " + cleansheets_count)
          }
        }
        // console.log(coach)
        // baseurl: https://api.sportmonks.com
        await axios.get(`https://api.sportmonks.com/v3/football/coaches/${coach_id}?api_token=aFdq5f6JjNXcsH2ldcGpRvxSw6rqoRAZBeh48Ie4QE2HVO0DKuDwYL5nEoN7`, {
        }).then(res => {
          //console.log(res.data)
          // console.log(res["data"]["data"])
          try {
            coach_name = res["data"]["data"]["display_name"]
            coach_image_path = res["data"]["data"]["image_path"]
          } catch (error) {
            coach_image_path = 'https://cdn.sportmonks.com/images/soccer/placeholder.png'
            coach_name = null;
          }
          // console.log(coach_name)
          // console.log(coach_image_path)
          add_teams_stats(
            team_id,
            team_name,
            team_code,
            image_path,
            founded,
            venue_id,
            coach_id,
            coach_name,
            coach_image_path,
            goals_conceded_count,
            goals_conceded_avg,
            goals_scored_count,
            goals_scored_avg,
            cleansheets_count
          )
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
});

async function add_teams_stats(
  team_id,
  team_name,
  team_code,
  image_path,
  founded,
  venue_id,
  coach_id,
  coach_name,
  coach_image_path,
  goals_conceded_count,
  goals_conceded_avg,
  goals_scored_count,
  goals_scored_avg,
  cleansheets_count
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Teams (team_id, team_name, team_code, image_path, founded, venue_id, coach_id, coach_name, coach_image_path, goals_conceded_count, goals_conceded_avg, goals_scored_count, goals_scored_avg, cleansheets_count) VALUES ?";
    const values = [
      [
        team_id,
        team_name,
        team_code,
        image_path,
        founded,
        venue_id,
        coach_id,
        coach_name,
        coach_image_path,
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