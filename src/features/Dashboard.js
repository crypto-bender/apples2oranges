import React from "react";
import { Button, Box, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleAnimation } from "../app/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { StyledComponentContainer } from "../styles/globalStyles";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const animationtoggle = useSelector((state) => state.main.animationtoggle);
  return (
    <StyledComponentContainer>
      <ButtonGroup
        variant="contained"
        onClick={() => dispatch(toggleAnimation())}
      >
        <Link to={"/joingame"} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              p: "1rem",
              outline: "white 2px solid",
              fontSize: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
              marginRight: "1rem",
              backgroundColor: "secondary.bold",
            }}
          >
            Join a Game
          </Button>
        </Link>
        <Link to={"/creategame"} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              p: "1rem",
              outline: "white 2px solid",
              fontSize: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
            }}
          >
            Create A Game
          </Button>
        </Link>
      </ButtonGroup>
    </StyledComponentContainer>
  );
};

export default Dashboard;
