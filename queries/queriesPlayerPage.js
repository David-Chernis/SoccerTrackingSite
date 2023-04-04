const mysql = require("mysql2");

// create a connection to the database
/**
 * Retrieves statistics for a given player from the database.
 * @param {number} playerId - The ID of the player whose statistics are to be retrieved.
 * @returns {void}
 */
function getPlayerStats(playerId) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    database: "cpsc304",
    port: "3306",
  });

  return new Promise((resolve, reject) => {
    const positionQuery = `SELECT position_name FROM Players WHERE player_id = ?`;

    connection.query(positionQuery, [playerId], function (error, results) {
      if (error) {
        console.error(error);
        reject(error);
      }

      const positionName = results ? results[0].position_name : '';

      const statsQuery = `
        SELECT
            Players.*,
            ${positionName}s.*
        FROM
            Players
            JOIN ${positionName}s ON Players.player_id = ${positionName}s.player_id
        WHERE
            Players.player_id = ?
            AND Players.position_name = ?`;

      connection.query(statsQuery, [playerId, positionName], function (error, results, fields) {
        if (error) {
          console.error(error);
          reject(error);
        }

        console.log(`Player with ID ${playerId}`);

        connection.end();
        
        resolve(results ? results[0] : results);
      });
    });
  });
}


/**
 * Updates the attribute value of a player in the database.
 * @param {number} teamId - The ID of the team to which the player belongs.
 * @param {number} playerId - The ID of the player whose attribute value is to be updated.
 * @param {string|number} attrVal - The new value of the attribute.
 * @param {string} attrName - The name of the attribute to be updated.
 * @returns {void}
 */
function updatePlayer(teamId, playerId, nationality, display_name, image_path, player_height, player_weight, date_of_birth, yellow_cards, avg_rating, position_name, nationality_image_path) {
  const connection = mysql.createConnection({
    host: "db-304.cxmntzj5c09u.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "Football304!",
    database: "cpsc304",
    port: "3306",
  });

  const query = `
        UPDATE 
            Players
        SET 
          nationality = ?,
          display_name = ?,
          image_path = ?,
          player_height = ?,
          player_weight = ?,
          date_of_birth = ?,
          yellow_cards = ?,
          avg_rating = ?,
          position_name = ?,
          nationality_image_path = ?
        WHERE 
            team_id = ? AND player_id = ?`;
  const values = [nationality, display_name, image_path, player_height, player_weight, date_of_birth, yellow_cards, avg_rating, position_name, nationality_image_path, teamId, playerId];

  connection.query(query, values, function (error, results, fields) {
    if (error) throw error;
    console.log("Player rating updated successfully");
    connection.end();
    return "successful"
  });
}

// updatePlayer(1, 1001, 9.5, 'avg_rating');
// getPlayerStats(22);
// close the connection to the database

module.exports = {
  getPlayerStats,
  updatePlayer
};
