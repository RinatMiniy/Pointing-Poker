import React from "react";
import { SetCards } from "../../types";
import { GameCard } from "../game-card/GameCard";
import { NewGameCard } from "../new-game-card/NewGameCard";

import styles from "./game-cards-field.module.scss";

type IGameCardsFieldProps = {
  cards: string[];
  sessionShortTitle: string;
  setCards: SetCards;
  handleAddingCard: (value: string) => void;
};

export const GameCardsField: React.FC<IGameCardsFieldProps> = (props) => {
  return (
    <div className={styles.gameCardsField}>
      <>
        {props.cards.map((card, idx) => (
          <GameCard
            key={card}
            id={idx}
            value={card}
            sessionShortTitle={props.sessionShortTitle}
            cards={props.cards}
          />
        ))}
        {props.setCards === SetCards.custom && (
          <NewGameCard handleAddingCard={props.handleAddingCard} />
        )}
      </>
    </div>
  );
};
