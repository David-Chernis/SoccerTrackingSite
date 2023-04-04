const mysql = require("mysql2");

/**
 * Returns the weekly table results. In descending order of points,
 * @param {int} week - The week upto and including to seach for.
 * @returns An array of teams with attributes [team_name, team_code, image_path, total_points, total_wins, total_draws, total_losses]
 */
async function get_weekly_results(week) {
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
        WITH MatchResults AS (
          SELECT
              match_week AS week,
              home_team_id AS team_id,
              home_team_points AS points,
              CASE
                  WHEN home_team_points = 3 THEN 1
                  ELSE 0
              END AS wins,
              CASE
                  WHEN home_team_points = 1 THEN 1
                  ELSE 0
              END AS draws,
              CASE
                  WHEN home_team_points = 0 THEN 1
                  ELSE 0
              END AS losses
          FROM
              Matches
          WHERE
              match_week <= ?
          UNION
          ALL
          SELECT
              match_week AS week,
              away_team_id AS team_id,
              away_team_points AS points,
              CASE
                  WHEN away_team_points = 3 THEN 1
                  ELSE 0
              END AS wins,
              CASE
                  WHEN away_team_points = 1 THEN 1
                  ELSE 0
              END AS draws,
              CASE
                  WHEN away_team_points = 0 THEN 1
                  ELSE 0
              END AS losses
          FROM
              Matches
          WHERE
              match_week <= ?
      ),
      WeeklyResults AS (
          SELECT
              team_id,
              SUM(points) AS total_points,
              SUM(wins) AS total_wins,
              SUM(draws) AS total_draws,
              SUM(losses) AS total_losses
          FROM
              MatchResults
          GROUP BY
              team_id
      )
      SELECT
          t.team_id,
          t.team_name,
          t.team_code,
          t.image_path,
          wr.total_points,
          wr.total_wins,
          wr.total_draws,
          wr.total_losses
      FROM
          WeeklyResults wr
          JOIN Teams t ON wr.team_id = t.team_id
      ORDER BY
          wr.total_points DESC,
          wr.total_wins DESC,
          wr.total_draws DESC,
          wr.total_losses;
        `;

        connection.query(sql, [week, week], (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Weekly results fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}

/**
 * Searches for players and teams that match the given search term.
 * @param {string} searchTerm - The term to search for.
 * @returns An array of players and teams in the form of [{{id, name, type: 'team'/'player'}] front end needs to call appropriate endpoint
 */
async function searchbar_players_teams(searchTerm) {
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
          player_id AS id,
          display_name AS name,
          image_path AS image,
          'Player' AS type
        FROM
            Players
        WHERE
            display_name LIKE '%${searchTerm}%'
        UNION
        SELECT
            team_id AS id,
            team_name AS name,
            image_path AS image,
            'Team' AS type
        FROM
            Teams
        WHERE
            team_name LIKE '%${searchTerm}%';
          `;

        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Results fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}

/**
 * Interactive minigame where the user inputs match scores and it gets all the teams that have previously had the exact same results.
 * User first inputs score where the team has played a home game and then inputs a score that the team has played an away game.
 * @param {int} homeTeam1
 * @param {int} awayTeam1
 * @param {int} homeTeam2
 * @param {int} awayTeam2
 * @returns
 */
async function match_games(homeTeam1, awayTeam1, homeTeam2, awayTeam2) {
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
        Teams.team_name, Teams.team_id, Teams.image_path as teams_image_path
    FROM
        Teams
    WHERE
        Teams.team_id IN (
            SELECT
                home_team_id
            FROM
                Matches
            WHERE
                home_team_score = ?
                AND away_team_score = ?
        )
        AND Teams.team_id IN (
            SELECT
                away_team_id
            FROM
                Matches
            WHERE
                home_team_score = ?
                AND away_team_score = ?
        );
        `;

        connection.query(
          sql,
          [homeTeam1, awayTeam1, homeTeam2, awayTeam2],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log("Weekly results fetched successfully.");
              resolve(results);
            }
            connection.end();
          }
        );
      }
    });
  });
}

module.exports = {
  get_weekly_results,
  searchbar_players_teams,
  match_games
};
