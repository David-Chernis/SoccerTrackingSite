import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./MiniGameView.css";

function MiniGame() {
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function searchQuery(score1, score2, setSearchResults) {
    const home = score1.split(":");
    const away = score2.split(":");

    const home1 = home[0];
    const away1 = home[1];

    const home2 = away[0];
    const away2 = away[2];

    fetch(
      `http://localhost:8000/miniGame?home1=${home1}&home2=${home2}&away1=${away1}&away2=${away2}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      });
  }

  function handleSubmit() {
    searchQuery(score1, score2, setSearchResults);
  }

  return (
    <Box className="gameBox">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            label="Score Home Team"
            value={score1}
            onChange={(e) => setScore1(e.target.value)}
            className="scoreField"
          />
          <TextField
            label="Score Away Team"
            value={score2}
            onChange={(e) => setScore2(e.target.value)}
            className="scoreField"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {searchResults.map((result, index) => (
          <Grid item key={index}>
            <a href={"/Team/" + result.team_id}>
              <img
                src={result.teams_image_path}
                alt="Team"
                className="teamImage"
              />
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MiniGame;
