import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import smile from "../assets/amitabh.jpg";

import Title from "./Title";
import GuessedLetters from "./GuessedLetters";

import Card from "../styled/Card";
import P from "../styled/P";
import Div from "../styled/Div";

const H3 = styled.h3`
  color: #716040;
  margin: 0 0 0 1rem;
  -webkit-text-stroke-width: 0.3px;
`;

const H4 = styled.h4`
  margin: 0;
  -webkit-text-stroke-width: 0.5px;
`;

const Speech = styled.div`
  border: 2px solid #020826;
  padding: 1rem;
  background-color: #fffffe;
  border-radius: 10px;

  @media (min-width: 460px) {
    border: 3px solid #020826;
  }
`;

const Ol = styled.ol`
  padding-left: 2rem;
  margin-bottom: 0;
`;

const svgStyle = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth >= 600) {
    return { width: "200px", height: "200px" };
  } else if (windowWidth >= 460) {
    return { width: "120px", height: "120px" };
  } else return { width: "100px", height: "100px" };
};

function Amitabh(props) {
  const { score } = useSelector(state => state.game);
  const { tries } = useSelector(state => state.movie);

  return (
    <div>
      <Card>
        <Div flexStart style={{ marginBottom: "1rem" }}>
          <a
            href='https://aaditkamat.me'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={smile} style={svgStyle()} alt='avatar' />
          </a>

          <div>
            <H3>Amitabh Bachchan, Bollywood Superstar </H3>
            <P style={{ margin: "2px 0 0 1rem" }}>
              {tries !== 0 && <GuessedLetters />}
            </P>
          </div>
        </Div>

        {score !== null && tries !== 0 && <Title />}

        <Speech>
          {props.dialogue && <P>{props.dialogue}</P>}

          {props.plot && <H4>Plot</H4>}
          {props.plot && <P movie>{props.plot}</P>}

          {props.actors && <H4>Featuring</H4>}
          {props.actors && <P movie>{props.actors}</P>}

          {props.director && <H4>Directed By</H4>}
          {props.director && <P movie>{props.director}</P>}
        </Speech>

        {tries === 0 && <Ol>{props.movieList}</Ol>}
      </Card>
    </div>
  );
}

export default Amitabh;
