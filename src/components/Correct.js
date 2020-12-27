import React from "react";
import Amitabh from "./Amitabh";
import Span from "../styled/Span";

export default function Correct() {
  const dialogue = `Congrats! You got it correct! Hope you can keep this going.`;

  const showDialogue = () => {
    return (
      <>
        <Span>Congrats! You got it correct! Hope you can keep this going.</Span>
      </>
    );
  };

  return <Amitabh status={"Is encouraging"} dialogue={showDialogue()} />;
}
