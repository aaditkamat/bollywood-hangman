import React, { useState } from "react";
import Button from "../styled/Button";
import { slur } from "../insults";
import Amitabh from "./Amitabh";
import Span from "../styled/Span";
import Div from "../styled/Div";

export default function Instructions(props) {
  let [num, setNum] = useState(0);

  const dialogue = [
    {
      amitabh: `Hey, you _slur_! I heard you know a lot about movies. Doubt you know more than me, ha!`,
      status: "Is being defensive",
      player: "Try me",
    },
    {
      amitabh: `How about we play a little game then? A test of your movie knowledge! Unless... you're scared!`,
      status: "Is being defensive",
      player: "Bring it",
    },
    {
      amitabh: `Ha! The name of the game is Hollywood Hangman. It's like regular hangman but with movies!`,
      status: "Is being defensive",
      player: "Go on",
    },
    {
      amitabh: `I'll think of a random movie from IMDb's top 1,000 movies. And, before you ask, yes, I have them all memorized!`,
      status: "Is bragging profusely",
      player: "Okay",
    },
    {
      amitabh: `Then I'll give you some hints and you have to guess the name of the movie. Got that, you _slur_?`,
      status: "Is feeling confident",
      player: "Got it",
    },
    {
      amitabh: `You only have _6_ guesses per movie! If you get the title correct, you move onto the next round!`,
      status: "Is feeling confident",
      player: "Piece of cake",
    },
    {
      amitabh: `If not then game over, ha! Are you ready to play, you _slur_?`,
      status: "Thinks he'll win",
      player: "I'm ready",
    },
  ];

  const splitDialogue = () => {
    // bolds the slurs and makes the score red
    if (dialogue[num].amitabh.includes("_slur_")) {
      const firstText = dialogue[num].amitabh.split("_slur_")[0];
      const secondText = dialogue[num].amitabh.split("_slur_")[1];

      return (
        <>
          {firstText}
          <Span>{slur()}</Span>
          {secondText}
        </>
      );
    }

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
    } else return dialogue[num].amitabh;
  };

  return (
    <div>
      <Amitabh status={dialogue[num].status} dialogue={splitDialogue()} />

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
