const mysql = require('mysql2');

/**
 * 
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

// function to insert a new player tuple into the Players table
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
    nationality_image_path)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [teamId, playerId, nationality, displayName, imagePath, playerHeight, playerWeight, dateOfBirth, yellowCards, avgRating, positionName, nationalityImagePath];

  connection.query(query, values, function (error, results, fields) {
    if (error) throw error;
    console.log('New player inserted successfully');
  });
  connection.end();
}

/**
 * Fetches all the players in a team from the database
 * @param {number} teamID - The ID of the team whose players are to be fetched
 * @returns {Promise<Array>} - A promise that resolves to an array of player objects
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
          WHERE team_id = ${teamID}`;
        ;

        connection.query(sql, (error, results) => {
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
 * @returns {Promise<Array>} - A promise that resolves to an array of team objects
 */
async function teamInfo(teamID){
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
          WHERE team_id = ${teamID}`;
        ;

        connection.query(sql, (error, results) => {
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
   * @returns {Promise<Array>} - A promise that resolves to an array of match objects
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
            home_team_id = ${teamID}
            OR away_team_id = ${teamID}
        ORDER BY
            match_week ASC`;
            
        connection.query(sql, (error, results) => {
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

  const query = 'DELETE FROM Players WHERE player_id = ? AND team_id = ?';

  const values = [playerId, teamId];

  connection.query(query, values, function (error, results, fields) {
    if (error) throw error;
    console.log(`Deleted ${results.affectedRows} row(s)`);
  });
  connection.end();
}


// example usage
// insertPlayer(1, 1001, 'Brazilian', 'Neymar Jr.', 'images/players/1001.jpg', 175.26, 68.04, '1992-02-05', 2, 8.5, 'Forward', 'images/flags/brazil.png');
// deletePlayer(1001, 1);
//  teamInfo(13).then((results) => console.log(results));
// matchesByTeam(13).then((results) => console.log(results));
// playersByTeam(13).then((results) => console.log(results));
// close the connection to the database
