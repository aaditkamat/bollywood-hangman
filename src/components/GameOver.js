import React, { useEffect, useState } from "react";
import Amitabh from "./Amitabh";
import gameOver from "../assets/gameover.png";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-dom-confetti";

import Div from "../styled/Div";
import Button from "../styled/Button";
import Img from "../styled/Img";

const TotallyRandom = require("totally-random");
const random = new TotallyRandom();

export default function GameOver() {
  const [partyTime, setPartyTime] = useState(false);
  const { moviesPlayed } = useSelector(state => state.game);
  const isMobile = useSelector(state => state.isMobile);
  const dispatch = useDispatch();

  useEffect(() => {
    // for confetti
    setPartyTime(true);
  }, []);

  const confettiConfig = () => {
    const defaultConfig = {
      angle: 90,
      spread: 360,
      startVelocity: 50,
      elementCount: 0,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 3,
      width: "10px",
      height: "10px",
      perspective: "500px",
      colors: ["#e53e3e", "#dd6b20", "#38a169", "#3182ce", "#d53f8c"],
    };

    for (let i = 0; i < moviesPlayed.length - 1; i++) {
      // adds more confetti, starts at 0
      defaultConfig.elementCount += 20;
    }

    if (isMobile) defaultConfig.startVelocity = 30;

    return defaultConfig;
  };

  const scoreSentence = () => {
    if (moviesPlayed.length == 1) {
      return "You didn't get any correct";
    }
    else {
      const grammar = moviesPlayed.length === 2 ? "movie": "movies";
      return `You only got ${moviesPlayed.length - 1} ${grammar} correct`;
    }
  };

  const dialogue = `${scoreSentence()}! Better luck next time.`;

  // displays movie data on screen
  let id = 0;
  const movieList = moviesPlayed.map(movie => {
    const lastMovie = moviesPlayed[moviesPlayed.length - 1].imdbID;
    id++;

    if (movie.imdbID === lastMovie) {
      return (
        <li key={id} style={{ textDecoration: "line-through" }}>
          {movie.Title}
        </li>
      );
    } else return <li key={id}>{movie.Title}</li>;
  });

  const playAgain = () => {
    dispatch({ type: "INITIAL_STATE_GAME" });
    dispatch({ type: "INITIAL_STATE_MOVIE" });
    dispatch({ type: "START_GAME" });
  };

  return (
    <>
      <Img src={gameOver} alt='game over' />
      <Div>
        <Confetti active={partyTime} config={confettiConfig()} />
      </Div>
      <Amitabh
        status={"Remains uncontested"}
        dialogue={dialogue}
        movieList={movieList}
      />

      <Div flexEnd>
        <Button onClick={playAgain}>Try Again</Button>
      </Div>
    </>
  );
}
