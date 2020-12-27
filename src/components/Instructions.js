import React, { useState } from "react";
import Button from "../styled/Button";
import Amitabh from "./Amitabh";
import Span from "../styled/Span";
import Div from "../styled/Div";

export default function Instructions(props) {
  let [num, setNum] = useState(0);

  const dialogue = [
    {
      amitabh: "Ladies and gentleman, I welcome you to the incredible game of _Bollywood Hangman_! Let's test your knowledge of Bollywood movies, shall we?",
      status: "Is introducing",
      player: "Yes, let's begin!",
    },
    {
      amitabh: `I'll think of a random movie from IMDb's top 1,000 movies. And, before you ask, yes, I have them all memorized!`,
      status: "Is explaining the game",
      player: "Okay",
    },
    {
      amitabh: `Then I'll give you some hints and you have to guess the name of the movie.`,
      status: "Is feeling confident",
      player: "Got it",
    },
    {
      amitabh: `You only have _6_ guesses per movie! If you get the title correct, you move onto the next round!`,
      status: "Is feeling confident",
      player: "Looks good so far!",
    },
    {
      amitabh: `If not then game over?`,
      status: "Thinks he'll win",
      player: "I'm ready",
    }
  ];

  const splitDialogue = () => {
    if (dialogue[num].amitabh.includes("_6_")) {
      const firstText = dialogue[num].amitabh.split("_6_")[0];
      const secondText = dialogue[num].amitabh.split("_6_")[1];

      return (
        <>
          {firstText}
          <Span score>6</Span>
          {secondText}
        </>
      );
    } else if (dialogue[num].amitabh.includes("_Bollywood Hangman_"))  {
      const firstText = dialogue[num].amitabh.split("_Bollywood Hangman_")[0];
      const secondText = dialogue[num].amitabh.split("_Bollywood Hangman_")[1];

      return (
        <>
          {firstText}
          <Span bold>Bollywood Hangman </Span>
          {secondText}
        </>
      );
    } else return dialogue[num].amitabh;
  };

  return (
    <div>
      <Amitabh dialogue={splitDialogue()} />

      <Div flexEnd>
        {/* hides when final dialogue is shown */}
        {dialogue[num].player !== "I'm ready" && (
          <Button onClick={props.startGame} leftButton>
            Skip all
          </Button>
        )}

        {/* hides when final dialogue is shown */}
        {dialogue[num].player !== "I'm ready" && (
          <Button onClick={() => setNum(num + 1)}>
            {dialogue[num].player}
          </Button>
        )}

        {/* shows when final dialogue is shown */}
        {dialogue[num].player === "I'm ready" && (
          <Button onClick={props.startGame}>{dialogue[num].player}</Button>
        )}
      </Div>
    </div>
  );
}
