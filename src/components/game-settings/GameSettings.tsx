/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import { Switcher } from "../../sharedComponents/switcher/Switcher";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { TimeField } from "../time-field/TimeField";
import { IGameSettings, SetCards } from "../../types";

import styles from "./game-settings.module.scss";
import { GameCardsField } from "../../sharedComponents/game-cards-field/GameCardsField";

type NewType = {
  gameSettings: IGameSettings;
  cards: string[];
  onSetTimer: (time: { min: number; sec: number }) => void;
  handlerScrumIsPlayer: () => void;
  handleChangeCardInEnd: () => void;
  handleIsTimerNeed: () => void;
  handleScopeType: (e: React.ChangeEvent) => void;
  handleScopeTypeShort: (e: React.ChangeEvent) => void;
  handleAutoLogin: (e: React.ChangeEvent) => void;
  handleFlipCards: (e: React.ChangeEvent) => void;
  handleChangeSetCards: (e: React.ChangeEvent) => void;
  handleAddingCard: (value: string) => void;
};

type IGameSettingsProps = NewType;

export const GameSettings: React.FC<IGameSettingsProps> = (props) => {
  return (
    <div className={styles.gameSettings}>
      <div className={styles.item}>
        <div className={styles.title}>Scram master as player:</div>
        <Switcher
          value={props.gameSettings.masterPlayer}
          onChange={props.handlerScrumIsPlayer}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Changing card in round end:</div>
        <Switcher
          value={props.gameSettings.changingCard}
          onChange={props.handleChangeCardInEnd}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Is timer needed:</div>
        <Switcher
          value={props.gameSettings.timer}
          onChange={props.handleIsTimerNeed}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Admit new members:</div>
        <Switcher
          value={props.gameSettings.autoLogin}
          onChange={props.handleAutoLogin}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Auto flip card:</div>
        <Switcher
          value={props.gameSettings.flipCards}
          onChange={props.handleFlipCards}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Set cards:</div>
        <select onChange={props.handleChangeSetCards}>
          {Object.keys(SetCards).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>
      <div className={styles.item}>
        <InputText
          field="Score type:"
          name="scopeType"
          isSmall={true}
          value={props.gameSettings.scoreType}
          onChange={props.handleScopeType}
        />
      </div>
      <div className={styles.item}>
        <InputText
          field="Score type (short):"
          name="scopeTypeShort"
          isSmall={true}
          value={props.gameSettings.scoreTypeShort}
          onChange={props.handleScopeTypeShort}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Round time:</div>
        <TimeField
          min={Math.floor(+props.gameSettings.roundTime / 60)}
          sec={+props.gameSettings.roundTime % 60}
          onSetTimer={props.onSetTimer}
        />
      </div>
      <div className={styles.title}>Add card values:</div>
      <GameCardsField
        cards={props.cards}
        sessionShortTitle={props.gameSettings.scoreTypeShort}
        setCards={props.gameSettings.setCards}
        handleAddingCard={props.handleAddingCard}
      />
    </div>
  );
};
