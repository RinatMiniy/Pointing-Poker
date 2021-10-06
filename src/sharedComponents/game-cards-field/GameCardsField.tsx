import React from "react";
import { GameCard } from "../game-card/GameCard";

import styles from "./game-cards-field.module.scss";

type IGameCardsFieldProps = {
  cards: string[];
  sessionShortTitle: string;
};

export const GameCardsField: React.FC<IGameCardsFieldProps> = (props) => {
  return (
    <div className={styles.gameCardsField}>
      {props.cards.map((card, idx) => (
        <GameCard
          key={card}
          id={idx}
          value={card}
          sessionShortTitle={props.sessionShortTitle}
          cards={props.cards}
        />
      ))}
    </div>
  );
};
