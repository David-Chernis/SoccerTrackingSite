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
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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
/**
 * Inserts a new attacker into the database.
 * 
 * @param {number} playerId - The ID of the player to insert.
 * @param {number} totalGoals - The total goals scored by the player.
 * @param {number} shotsOnTarget - The total shots on target by the player.
 * @param {number} teamId - The ID of the team the player belongs to.
 */
function insertAttacker(playerId, totalGoals, shotsOnTarget, teamId) {
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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

/**
 * Inserts a new defender into the database.
 * 
 * @param {number} playerId - The ID of the player to insert.
 * @param {number} totalTackles - The total tackles made by the player.
 * @param {number} interceptions - The total interceptions made by the player.
 * @param {number} clearances - The total clearances made by the player.
 * @param {number} teamId - The ID of the team the player belongs to.
 */
function insertDefender(playerId, totalTackles, interceptions, clearances, teamId) {
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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

/**
 * Inserts a new midfielder into the database.
 * 
 * @param {number} playerId - The ID of the player to insert.
 * @param {number} assists - The total assists made by the player.
 * @param {number} accuratePasses - The total accurate passes made by the player.
 * @param {number} teamId - The ID of the team the player belongs to.
 */
function insertMidfielder(playerId, assists, accuratePasses, teamId) {
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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

/**
 * 
 * @param {number} playerId ID of the player to insert
 * @param {number} saves number of saves the goalkeeper has made.
 * @param {number} goalsConceded number of goals the goalkeeper has conceded.
 * @param {number} teamId ID of the team the goalkeeper belongs to.
 */
function insertGoalkeeper(playerId, saves, goalsConceded, teamId) {
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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
var connection = mysql.createConnection({
  host: "database-2.cmldinzrktwi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d19922000",
  port: "3306",
  database: "db304",
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
