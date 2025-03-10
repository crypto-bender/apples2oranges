import React, { useState, useEffect } from "react";
import { Button, Box, Input, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { lobbyClient } from "./utils/lobbyClient";
import { useDispatch, useSelector } from "react-redux";
import {
  setMatchID,
  setPlayerID,
  setPlayerCredentials,
} from "../app/mainSlice";
import { useNavigate } from "react-router-dom";
import {
  StyledComponentContainer,
  StyledInnerBox,
} from "../styles/globalStyles";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: "10rem",
  width: "100%",
  maxWidth: "16rems",
  lineHeight: "10rem",
  outline: "white solid 1px",
  backgroundColor: "black",
  color: "white",
  fontSize: "2rem",
}));

const Lobby = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [playerMatch, setPlayerMatch] = useState({});
  const [playerAccessKey, setPlayerAccessKey] = useState({});
  const [gameMatchID, setGameMatchID] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getAllAvailableGames().then(({ matches }) => {
      console.log(matches);
      setPlayerMatch(matches);
    });
  }, []);

  const getAllAvailableGames = () => {
    return lobbyClient
      .listMatches("Apples2Oranges")
      .catch((err) => console.log(err));
  };

  const joinMatchHandler = () => {
    lobbyClient
      .joinMatch("Apples2Oranges", sessionCode, {
        // playerID: "0",
        playerName: name,
        //data: "optional player meta data",
      })
      .then((player) => {
        console.log("player cred in Lobby", player);
        localStorage.setItem("matchID", sessionCode);
        localStorage.setItem("name", name);
        localStorage.setItem("id", player.playerID);
        localStorage.setItem("credentials", player.playerCredentials);
        // dispatch(setPlayerID(player.playerID));
        // dispatch(setPlayerCredentials(player.playerCredentials));
      })
      .then(() => {
        navigate(`/waitingroom/${sessionCode}`);
      })
      .catch((err) => console.log("error in lobby join match handler", err));
  };

  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   alignItems="flex-start"
    //   minHeight="100vh"
    //   width="100%"
    // ></Box>
    <StyledComponentContainer>
      <Box>
        <Typography variant="h3" sx={{ mt: "1em" }}>
          Join a Game
        </Typography>
        <Box>
          <Typography variant="h5" sx={{ mt: "1em" }}>
            Enter the session code for the game you want to join
          </Typography>
          <Input
            placeholder="Session Code"
            value={sessionCode}
            onChange={(e) => {
              setSessionCode(e.target.value);
            }}
          />
        </Box>
        <StyledInnerBox>
          <Typography variant="h5" sx={{ mt: "1em" }}>
            Enter the player name you'll use for this game
          </Typography>
          <Input
            placeholder="Nick Name"
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
          <Button variant="contained" onClick={() => joinMatchHandler()}>
            Join
          </Button>
        </StyledInnerBox>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ mt: "1em" }}>
          Join a public game
        </Typography>
        <Box
          sx={{
            p: 2,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: "2em",
            mt: "1em",
            justifyItems: "center",
          }}
          style={{ marginTop: "1em" }}
        >
          {[0, 1, 2].map((matchId) => (
            <Item
              key={matchId}
              elevation={8}
              onClick={(e) => joinMatchHandler(e.target.key)}
            >
              Game
            </Item>
          ))}
        </Box>
      </Box>
    </StyledComponentContainer>
  );
};
export default Lobby;
