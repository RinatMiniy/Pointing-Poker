import React from "react";
import { Switcher } from "../../sharedComponents/switcher/Switcher";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { TimeField } from "../time-field/TimeField";
import { IGameSettings } from "../../types";

import styles from "./game-settings.module.scss";

type NewType = {
  gameSettings: IGameSettings;
  onSetMinutes: (e: React.ChangeEvent) => void;
  onSetSeconds: (e: React.ChangeEvent) => void;
  handlerScrumIsPlayer: () => void;
  handleChangeCardInEnd: () => void;
  handleIsTimerNeed: () => void;
  handleScopeType: (e: React.ChangeEvent) => void;
  handleScopeTypeShort: (e: React.ChangeEvent) => void;
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
          onSetMinutes={props.onSetMinutes}
          onSetSeconds={props.onSetSeconds}
        />
      </div>
      <div className={styles.title}>Add card values:</div>
    </div>
  );
};
