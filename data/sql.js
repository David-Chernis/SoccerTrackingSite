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
    axios.get('https://api.sportmonks.com/v3/football/teams/seasons/10', {
      params: {
        api_token: 'IFRQw1iBMF72jh5ZjMR5OM73uCrKgx2OYkC0QMgNy2KwwFqffigo8km6ui1r',
        includes: 'coaches;statistics.details.type',
        filters: 'teamStatisticSeasons:10'
      }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});
