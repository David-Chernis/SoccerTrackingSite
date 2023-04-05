CREATE TABLE Teams (
  team_id INT NOT NULL,
  team_name VARCHAR(255) NOT NULL,
  team_code VARCHAR(255),
  image_path VARCHAR(255),
  founded VARCHAR(6),
  venue_id INT,
  coach_id INT,
  goals_conceded_count INT,
  goals_conceded_avg FLOAT,
  goals_scored_count INT,
  goals_scored_avg FLOAT,
  cleansheets_count INT,
  coach_name VARCHAR(255),
  coach_image_path VARCHAR(255),
  PRIMARY KEY (team_id)
);

CREATE TABLE Players (
  team_id INT NOT NULL,
  player_id INT NOT NULL,
  nationality VARCHAR(255),
  display_name VARCHAR(255),
  image_path VARCHAR(255),
  player_height FLOAT,
  player_weight FLOAT,
  date_of_birth DATE,
  yellow_cards INT,
  avg_rating FLOAT,
  position_name VARCHAR(255),
  nationality_image_path VARCHAR(255),
  PRIMARY KEY (player_id, team_id),
  FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

CREATE TABLE Attackers (
  player_id INT NOT NULL,
  team_id INT NOT NULL,
  total_goals INT,
  shots_on_target INT,
  PRIMARY KEY (player_id, team_id),
  FOREIGN KEY (team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
);

CREATE TABLE Defenders (
  player_id INT NOT NULL,
  team_id INT NOT NULL,
  total_tackles INT,
  interceptions INT,
  clearances INT,
  PRIMARY KEY (player_id, team_id),
  FOREIGN KEY (team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
);

CREATE TABLE Midfielders (
  player_id INT NOT NULL,
  team_id INT NOT NULL,
  assists INT,
  accurate_passes INT,
  PRIMARY KEY (player_id, team_id),
  FOREIGN KEY (team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
);

CREATE TABLE Goalies (
  player_id INT NOT NULL,
  team_id INT NOT NULL,
  saves INT,
  goals_conceded INT,
  PRIMARY KEY (player_id, team_id),
  FOREIGN KEY (team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
);

CREATE TABLE Matches (
  match_id INT NOT NULL,
  match_week INT,
  home_team_id INT,
  away_team_id INT,
  home_team_score INT,
  away_team_score INT,
  home_team_points INT,
  away_team_points INT,
  PRIMARY KEY (match_id),
  FOREIGN KEY (home_team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (away_team_id) REFERENCES Teams(team_id)
);