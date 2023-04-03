const mysql = require("mysql2");

/**
 * Retrieves the list of top-rated players with an average rating above 7.
 * @returns An array of objects containing the player's in the form of [{display_name,avg_rating,player_image_path}]
 */
async function top_rated_players() {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        const sql = `
                SELECT
                player_id,
                display_name,
                avg_rating,
                image_path AS player_image_path
            FROM
                Players
            GROUP BY
                player_id
            HAVING
                avg_rating > 7.5
            ORDER BY
                avg_rating DESC;
          `;

        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Top rated players fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}

/**
 * Retrieves the list of top-rated teams with an average player rating above 6.5.
 * @returns An array of objects containing the teams in the form of [{team_id, team_name, average_rating, team_image_path}]
 */
async function top_rated_teams() {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        const sql = `
                SELECT
                Teams.team_id,
                Teams.team_name,
                AVG(Players.avg_rating) AS average_rating,
                Teams.image_path AS team_image_path
            FROM
                Teams
                JOIN Players ON Teams.team_id = Players.team_id
            GROUP BY
                Teams.team_id
            HAVING
                AVG(Players.avg_rating) > 6.5
            ORDER BY
                average_rating DESC;
          `;

        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Top rated teams fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}

/**
 * Retrieves the list of teams with the average amount goals they have scored each game.
 * @returns An array of objects containing the teams in the form of [{team_id, team_name, average_goals_scored, team_image_path}]
 */
async function top_teams_average_scoring() {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        const sql = `
            SELECT
            SUM(subquery.total_goals) / 38 AS average_goals_scored,
            Teams.team_id,
            Teams.team_name,
            Teams.image_path as team_image_path
        FROM
            (
                SELECT
                    Matches.home_team_id AS team_id,
                    SUM(home_team_score) AS total_goals
                FROM
                    Matches
                GROUP BY
                    home_team_id
                UNION
                ALL
                SELECT
                    Matches.away_team_id AS team_id,
                    SUM(away_team_score) AS total_goals
                FROM
                    Matches
                GROUP BY
                    away_team_id
            ) AS subquery
            JOIN Teams ON subquery.team_id = Teams.team_id
        GROUP BY
            Teams.team_id
        ORDER BY
            SUM(subquery.total_goals) / 38 DESC;
            `;

        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Top rated teams fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}

/**
 * Retrieves the list of teams with the average amount goals they have conceeded each game.
 * @returns An array of objects containing the teams in the form of [{team_id, team_name, average_goals_conceeded, team_image_path}]
 */
async function top_teams_average_conceeded() {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        const sql = `
              SELECT
              SUM(subquery.total_goals_conceeded) / 38 AS average_goals_conceeded,
              Teams.team_id,
              Teams.team_name,
              Teams.image_path as team_image_path
          FROM
              (
                  SELECT
                      Matches.home_team_id AS team_id,
                      SUM(away_team_score) AS total_goals_conceeded
                  FROM
                      Matches
                  GROUP BY
                      home_team_id
                  UNION
                  ALL
                  SELECT
                      Matches.away_team_id AS team_id,
                      SUM(home_team_score) AS total_goals_conceeded
                  FROM
                      Matches
                  GROUP BY
                      away_team_id
              ) AS subquery
              JOIN Teams ON subquery.team_id = Teams.team_id
          GROUP BY
              Teams.team_id
          ORDER BY
              SUM(subquery.total_goals_conceeded) / 38 DESC;
              `;

        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Top rated teams fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}
// Usage example:
top_teams_average_scoring()
  .then((results) => console.log(results))
  .catch((error) => console.error(error));
