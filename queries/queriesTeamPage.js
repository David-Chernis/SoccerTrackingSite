const mysql = require("mysql2");

/**
 * function to insert a new player tuple into the Players table
 * @param {*} teamId
 * @param {*} playerId
 * @param {*} nationality
 * @param {*} displayName
 * @param {*} imagePath
 * @param {*} playerHeight
 * @param {*} playerWeight
 * @param {*} dateOfBirth
 * @param {*} yellowCards
 * @param {*} avgRating
 * @param {*} positionName
 * @param {*} nationalityImagePath
 */
function insertPlayer(teamId, playerId, nationality, displayName, imagePath, playerHeight, playerWeight, dateOfBirth, yellowCards, avgRating, positionName, nationalityImagePath) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  const query = `
    INSERT INTO 
    Players (
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
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [teamId, playerId, nationality, displayName, imagePath, playerHeight, playerWeight, dateOfBirth, yellowCards, avgRating, positionName, nationalityImagePath];

  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("New player inserted successfully");
        connection.end();
        resolve();
      }
    });
  });
}

function insertAttacker(playerId, totalGoals, shotsOnTarget, teamId) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  const query = `
    INSERT INTO 
    Attackers (
      player_id, 
      total_goals, 
      shots_on_target,
      team_id
    ) 
    VALUES (?, ?, ?, ?)`;

  const values = [playerId, totalGoals, shotsOnTarget, teamId];

  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("New attacker inserted successfully");
        connection.end();
        resolve();
      }
    });
  });
}

function insertDefender(playerId, totalTackles, interceptions, clearances, teamId) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  const query = `
    INSERT INTO 
    Defenders (
      player_id, 
      total_tackles, 
      interceptions, 
      clearances,
      team_id
    ) 
    VALUES (?, ?, ?, ?, ?)`;

  const values = [playerId, totalTackles, interceptions, clearances, teamId];

  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("New defender inserted successfully");
        connection.end();
        resolve();
      }
    });
  });
}


function insertMidfielder(playerId, assists, accuratePasses, teamId) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  const query = `
    INSERT INTO 
    Midfielders (
      player_id, 
      assists, 
      accurate_passes,
      team_id
    ) 
    VALUES (?, ?, ?, ?)`;

  const values = [playerId, assists, accuratePasses, teamId];

  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("New midfielder inserted successfully");
        connection.end();
        resolve();
      }
    });
  });
}

function insertGoalkeeper(playerId, saves, goalsConceded, teamId) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  const query = `
    INSERT INTO 
    Goalkeepers (
      player_id, 
      saves, 
      goals_conceded,
      team_id
    ) 
    VALUES (?, ?, ?, ?)`;

  const values = [playerId, saves, goalsConceded, teamId];

  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("New goalkeeper inserted successfully");
        connection.end();
        resolve();
      }
    });
  });
}

/**
 * Fetches all the players in a team from the database
 * @param {number} teamID - The ID of the team whose players are to be fetched
 */
async function playersByTeam(teamID) {
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
          SELECT *
          FROM Players
          WHERE team_id = ?`;
        connection.query(sql, [teamID], (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("players fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}


/**
 * Fetches information about a team from the database
 * @param {number} teamID - The ID of the team whose information is to be fetched
 */
async function teamInfo(teamID) {
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
          SELECT *
          FROM Teams
          WHERE team_id = ?`;
        connection.query(sql, [teamID], (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("teamInfo fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}


/**
 * Fetches all the matches played by a team from the database
 * @param {number} teamID - The ID of the team whose matches are to be fetched
 */
async function matchesByTeam(teamID) {
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
            Matches.*,
            HomeTeam.image_path AS home_image_path,
            HomeTeam.team_code AS home_team_code,
            AwayTeam.image_path AS away_image_path,
            AwayTeam.team_code AS away_team_code
        FROM
            Matches
            JOIN Teams AS HomeTeam ON Matches.home_team_id = HomeTeam.team_id
            JOIN Teams AS AwayTeam ON Matches.away_team_id = AwayTeam.team_id
        WHERE
            home_team_id = ?
            OR away_team_id = ?
        ORDER BY
            match_week ASC`;

        connection.query(sql, [teamID, teamID], (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("matches fetched successfully.");
            resolve(results);
          }
          connection.end();
        });
      }
    });
  });
}


/**
 * Deletes a player with the given player ID and team ID from the Players table.
 *
 * @param {number} playerId - The ID of the player to delete.
 * @param {number} teamId - The ID of the team that the player belongs to.
 */
function deletePlayer(playerId, teamId) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    port: "3306",
    database: "cpsc304",
  });

  const query = "DELETE FROM Players WHERE player_id = ? AND team_id = ?";

  const values = [playerId, teamId];

  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log(`Deleted ${results.affectedRows} row(s)`);
        connection.end();
        resolve();
      }
    });
  });
}


// insertPlayer(1, 1001, 'Brazilian', 'Neymar Jr.', 'images/players/1001.jpg', 175.26, 68.04, '1992-02-05', 2, 8.5, 'Forward', 'images/flags/brazil.png');
// insertAttacker(1001, 2,3, 1);

// deletePlayer(1001, 1);
// teamfo(13).then((results) => console.log(results));
// matchesByTeam(13).then((results) => console.log(results));
// playersByTeam(13).then((results) => console.log(results));


module.exports = {
  insertPlayer,
  playersByTeam,
  teamInfo,
  matchesByTeam,
  deletePlayer,
  insertAttacker, 
  insertDefender, 
  insertGoalkeeper,
  insertMidfielder
};
