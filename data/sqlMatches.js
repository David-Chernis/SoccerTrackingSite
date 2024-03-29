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
  let hasMore = true;
  let pageNum = 1;
  let weekNum = 0;

  const hashMap = {}
  while (hasMore) {
    await axios.get('https://api.sportmonks.com/v3/football/fixtures?api_token=aFdq5f6JjNXcsH2ldcGpRvxSw6rqoRAZBeh48Ie4QE2HVO0DKuDwYL5nEoN7&filters=fixtureSeasons:10;&includes=participants;scores;round', {
      params: {
        page: `${pageNum}`
      }
    })
      .then(async response => {
        hasMore = Boolean(response["data"]["pagination"]["has_more"]);


        for (let i = 0; i < response["data"]["data"].length; i++) {
          let home_team_score;
          let away_team_score;
          let match_id;
          let away_team_id;
          let home_team_id;
          let home_team_name;
          let away_team_name;
          data = response["data"]["data"][i]
          match_id = Number(data["id"]);
          if (!hashMap.hasOwnProperty(data["round_id"])) {
            weekNum += 1
            hashMap[data["round_id"]] = weekNum
          }
          home_team_id = data["participants"];
          // console.log(data["participants"])
          if (data["participants"][0]["meta"]["location"] == 'away') {
            home_team_id = Number(data["participants"][1]["id"])
            away_team_id = Number(data["participants"][0]["id"])
          } else {
            home_team_id = Number(data["participants"][0]["id"])
            away_team_id = Number(data["participants"][1]["id"])
          }
          match_week = hashMap[data["round_id"]];

          let score_data = data["scores"]
          for (let j = 0; j < score_data.length; j++) {
            if (score_data[j]["description"] == "CURRENT") {
              // console.log(score_data)
              if (score_data[j]["score"]["participant"] == "home") {
                // console.log("home")
                home_team_score = Number(score_data[j]["score"]["goals"])
              }

              if (score_data[j]["score"]["participant"] == "away") {
                // console.log("away")

                away_team_score = Number(score_data[j]["score"]["goals"])
              }
            }
          }
          if (home_team_score == away_team_score) {
            home_team_points = 1;
            away_team_points = 1;
          } else if (home_team_score < away_team_score) {
            home_team_points = 0;
            away_team_points = 3;
          } else {
            home_team_points = 3;
            away_team_points = 0;
          }
          add_match(
            match_id,
            match_week,
            home_team_id,
            away_team_id,
            home_team_score,
            away_team_score,
            home_team_points,
            away_team_points)

        }



      })
      .catch(error => {
        console.log(error);
      });
    pageNum += 1
  }
});

async function add_match(
  match_id,
  match_week,
  home_team_id,
  away_team_id,
  home_team_score,
  away_team_score,
  home_team_points,
  away_team_points
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Matches (match_id, match_week, home_team_id, away_team_id, home_team_score, away_team_score, home_team_points, away_team_points) VALUES ?";
    const values = [
      [
        match_id,
        match_week,
        home_team_id,
        away_team_id,
        home_team_score,
        away_team_score,
        home_team_points,
        away_team_points,
      ],
    ];
    connection.query(sql, [values], (error, res) => {
      if (error) throw error;
      console.log("Match Added");
      console.log(res)
      resolve("Success");
    });
  });
}