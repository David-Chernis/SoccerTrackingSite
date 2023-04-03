import "./Navbar.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import logo from "./images/logo.png";
import Input from "@mui/material/Input";
// import SearchIcon from "@mui/icons-material/SearchRounded";
import { useState } from "react";

export default function Navbar(props) {
  return (
    <AppBar position="static" sx={{ bgcolor: "#040428", color: "#000" }}>
      <Container
        maxWidth="false"
        sx={{
          maxWidth: "1500px",
        }}
      >
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="logo"
            width="75px"
            height="75px"
            style={{
              margin: "10px 20px 10px 0px",
            }}
          />
          <SearchBar search={props.search} />
          <Button
            className="Top-Button"
            variant="contained"
            sx={{
              color: "primary.main",
              bgcolor: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.contrastText",
                filter: "invert(0.1)",
              },
            }}
          >
            <strong>Top Players and Teams</strong>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
    if (event.target.value.length > 0) {
      props.search(event.target.value, setSearchResults);
    } else {
      setSearchResults([]);
    }
  }

  return (
    <Container
      className="Search"
      disableGutters
      maxWidth="false"
      sx={{
        position: "relative",
        display: "flex",
        backgroundColor: "primary.contrastText",
        border: "2px solid primary.main",
      }}
    >
      <Input
        disableUnderline
        color="primary"
        placeholder="Search Teams and Players"
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          color: "primary.main",
          flexGrow: 1,
          fontWeight: "bold",
        }}
      />
      {searchResults.length > 0 && (
        <Container
          sx={{
            position: "absolute",
            zIndex: 1,
            top: "100%",
            maxHeight: "200px",
            overflowY: "scroll",
            backgroundColor: "primary.contrastText",
            width: "100%",
            border: "1px solid primary.main",
            borderTop: "none",
          }}
        >
          {searchResults.map((result, index) => {
            const { id, name, type, image } = result;
            const url = `/${type}/${id}`;
            return (
              <a key={index} href={url} className="search-result">
                <div className="search-result-container">
                  <img src={image} alt={name} className="search-result-image" />
                  <div className="search-result-text">
                    <div className="search-result-name">{name}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </Container>
      )}
    </Container>
  );
}
