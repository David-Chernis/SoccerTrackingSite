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

const tids = [1];

// , 3, 6, 8, 9, 10, 13, 14, 15, 18, 19, 20, 25, 26, 30, 33, 42, 51, 52, 65

connection.connect(async (err) => {
  //Accessing Teams and Stats Data need to populate and also add coaches
  for (let i = 0; i < tids.length; i++) {
    let team_id;
    let player_id;
    let nationality;
    let display_name;
    let image_path;
    let player_height;
    let player_weight;
    let date_of_birth;
    let yellow_cards;
    let avg_rating;
    let position_name;
    let nationality_image_path;

    // Attacker vars
    let total_goals;
    let shots_on_target;

    // Defender
    let total_tackles;
    let interceptions;
    let clearances;

    // Goalie
    let saves;
    let goals_conceded;

    // Midfielders
    let assists;
    let accurate_passes;
    await axios.get(`https://api.sportmonks.com/v3/football/squads/seasons/10/teams/${tids[i]}?`, {
      params: {
        api_token: 'IFRQw1iBMF72jh5ZjMR5OM73uCrKgx2OYkC0QMgNy2KwwFqffigo8km6ui1r',
        includes: 'player.statistics'
      }
    })
      .then(async response => {
        //Example of access
        Tres_data = response["data"]["data"]
        console.log(Tres_data.length)
        for (let j = 0; j < Tres_data.length; j++) {
          // console.log(Tres_data[j]["player_id"])
          await axios.get(`https://api.sportmonks.com/v3/football/players/${Tres_data[j]["player_id"]}?`, {
            params: {
              api_token: 'IFRQw1iBMF72jh5ZjMR5OM73uCrKgx2OYkC0QMgNy2KwwFqffigo8km6ui1r',
              includes: 'statistics.details.type;nationality;position',
              filters: 'playerStatisticSeasons:10'
            }
          })
            .then(async Presponse => {
              //Example of access\
              total_goals = 0;
              shots_on_target = 0;
              total_tackles = 0;
              interceptions = 0;
              clearances = 0;
              saves = 0;
              goals_conceded = 0;
              assists = 0;
              accurate_passes = 0;
              Pres_data = Presponse["data"]["data"]
              nationality = Pres_data["nationality"]["name"]
              nationality_image_path = Pres_data["nationality"]["image_path"]
              team_id = tids[i]
              player_id = Number(Pres_data["id"])
              display_name = Pres_data["name"]
              image_path = Pres_data["image_path"]
              player_height = Number(Pres_data["height"])
              player_weight = Number(Pres_data["weight"])
              date_of_birth = Pres_data["date_of_birth"]
              let pDetails = Pres_data["statistics"][0]["details"];
              position_name = Pres_data["position"]["name"]
              for (let k = 0; k < pDetails.length; k++) {
                if (pDetails[k]["type"]["name"] == "Yellowcards") {
                  yellow_cards = pDetails[k]["value"]["total"]
                }
                if (pDetails[k]["type"]["name"] == "Rating") {
                  avg_rating = pDetails[k]["value"]["average"]
                }

                // by position
                if (position_name == "Attacker") {
                  if (pDetails[k]["type"]["name"] == "Goals") {
                    total_goals = pDetails[k]["value"]["total"]
                  }
                  if (pDetails[k]["type"]["name"] == "Shots On Target") {
                    shots_on_target = pDetails[k]["value"]["total"]
                  }
                }

                if (position_name == "Defender") {
                  if (pDetails[k]["type"]["name"] == "Tackles") {
                    total_tackles = pDetails[k]["value"]["total"]
                  }
                  if (pDetails[k]["type"]["name"] == "Interceptions") {
                    interceptions = pDetails[k]["value"]["total"]
                  }
                  if (pDetails[k]["type"]["name"] == "Clearances") {
                    clearances = pDetails[k]["value"]["total"]
                  }
                }

                if (position_name == "Goalkeeper") {

                  if (pDetails[k]["type"]["name"] == "Saves") {
                    saves = pDetails[k]["value"]["total"]
                  }
                  if (pDetails[k]["type"]["name"] == "Goals Conceded") {
                    goals_conceded = pDetails[k]["value"]["total"]
                  }
                }

                if (position_name == "Midfielder") {
                  if (pDetails[k]["type"]["name"] == "Assists") {
                    assists = pDetails[k]["value"]["total"]
                  }
                  if (pDetails[k]["type"]["name"] == "Accurate Passes") {
                    accurate_passes = pDetails[k]["value"]["total"]
                  }
                }
              }
              console.log("pid: " + player_id,"tid: " + team_id)
              add_player(
                team_id,
                player_id,
                nationality,
                display_name,
                image_path,
                player_height,
                player_weight,
                new Date(date_of_birth),
                yellow_cards,
                avg_rating,
                position_name,
                nationality_image_path
              )

              if (position_name == "Attacker") {
                add_attacker(
                  team_id,
                  player_id,
                  total_goals,
                  shots_on_target
                )
              }
              if (position_name == "Midfielder") {
                add_midfielder(
                  team_id,
                  player_id,
                  assists,
                  accurate_passes
                )
              }
              if (position_name == "Goalkeeper") {
                add_goalie(
                  team_id,
                  player_id,
                  saves,
                  goals_conceded
                )
              }
              if (position_name == "Defender") {
                add_defender(
                  team_id,
                  player_id,
                  total_tackles,
                  interceptions,
                  clearances
                )
              }

              // console.log(position_name, 
              //   total_goals,
              //   shots_on_target,
              //   total_tackles,
              //   interceptions,
              //   clearances,
              //   saves,
              //   goals_conceded,
              //   assists,
              //   accurate_passes)
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });

  }


});

async function add_player(
  team_id,
  player_id,
  nationality,
  display_name,
  image_path,
  player_height,
  player_weight,
  date_of_birth,
  yellow_cards,
  avg_rating,
  position_name,
  nationality_image_path

) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Players (team_id, player_id, nationality, display_name, image_path, player_height, player_weight, date_of_birth, yellow_cards, avg_rating, position_name, nationality_image_path) VALUES ?";
    const values = [
      [
        team_id,
        player_id,
        nationality,
        display_name,
        image_path,
        player_height,
        player_weight,
        date_of_birth,
        yellow_cards,
        avg_rating,
        position_name,
        nationality_image_path,

      ],
    ];
    connection.query(sql, [values], (error, res) => {
      if (error) throw error;
      console.log("Player Added");
      console.log(res)
      resolve("Success");
    });
  });
}

async function add_attacker(
  team_id,
  player_id,
  total_goals,
  shots_on_target
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Attackers (team_id, player_id, total_goals, shots_on_target) VALUES ?";
    const values = [
      [
        team_id, 
        player_id,
        total_goals,
        shots_on_target,
      ],
    ];
    connection.query(sql, [values], (error, res) => {
      if (error) throw error;
      console.log("Attacker Added");
      console.log(res)
      resolve("Success");
    });
  });
}

async function add_midfielder(
  team_id,
  player_id,
  assists,
  accurate_passes
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Midfielders (team_id, player_id, assists, accurate_passes) VALUES ?";
    const values = [
      [
        team_id, 
        player_id,
        assists,
        accurate_passes,
      ],
    ];
    connection.query(sql, [values], (error, res) => {
      if (error) throw error;
      console.log("Midfielder Added");
      console.log(res)
      resolve("Success");
    });
  });
}

async function add_goalie(
  team_id,
  player_id,
  saves,
  goals_conceded
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Goalkeepers (team_id, player_id, saves, goals_conceded) VALUES ?";
    const values = [
      [
        team_id, 
        player_id,
        saves,
        goals_conceded,
      ],
    ];
    connection.query(sql, [values], (error, res) => {
      if (error) throw error;
      console.log("Goalie Added");
      console.log(res)
      resolve("Success");
    });
  });
}

async function add_defender(
  team_id,
  player_id,
  total_tackles,
  interceptions,
  clearances
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Defenders (team_id, player_id, total_tackles, interceptions, clearances) VALUES ?";
    const values = [
      [
        team_id, 
        player_id,
        total_tackles,
        interceptions,
        clearances,
      ],
    ];
    connection.query(sql, [values], (error, res) => {
      if (error) throw error;
      console.log("Defender Added");
      console.log(res)
      resolve("Success");
    });
  });
}
