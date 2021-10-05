/* eslint-disable jsx-a11y/aria-role */
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotify } from "../../../../hooks/useNotify";
import { H1 } from "../../../../sharedComponents/h1/H1";
import { InputText } from "../../../../sharedComponents/inputText/InputText";
import { Button } from "../../../../sharedComponents/button/button";
import { PlayerCard } from "../../../player-card/PlayerCard";
import { Members } from "../../../../sharedComponents/members/Members";
import { Priority } from "../../../../types";
import { GameSettings } from "../../../game-settings/GameSettings";

import styles from "../lobby-page.module.scss";
import { Issues } from "../../../issues/Issues";
import {
  selectIssues,
  selectSessionHash,
  selectSessionTitle,
  selectSettings,
  selectUsers,
} from "../../../redux/selectors";
import {
  changingCard,
  createIssue,
  deleteIssue,
  masterPlayer,
  updateIssue,
  updateTitle,
  timer,
  scoreType,
  scoreTypeShort,
  roundTime,
} from "../../../redux/actions";
import { socket } from "../../../../api/socket";

export const LobbyDealer: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const issues = useSelector(selectIssues);

  const gameSettings = useSelector(selectSettings);

  const [sessionTitle, setSessionTitle] = React.useState(
    useSelector(selectSessionTitle)
  );

  const link = `http://pockerplanning.chttp://${useSelector(
    selectSessionHash
  )}`;

  const dealer = users.find((user) => user.role === "dealer");

  const [inputVisible, setInputVisible] = React.useState(false);

  const notify = useNotify();

  const handleSessionName = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSessionTitle(target.value);
  };

  const onSubmitSessionName = () => {
    if (sessionTitle) {
      setInputVisible(false);
      dispatch(updateTitle(sessionTitle));
    } else {
      notify({
        type: "error",
        message: "Name should be set!",
      });
    }
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(link);

    notify({
      type: "success",
      message: "Copy",
    });
  };

  const onChangeIssue = (id: number, title: string, priority: Priority) => {
    dispatch(updateIssue({ id, title, priority }));
  };

  const onConfirmUpdate = (title: string) => {
    if (title) {
      notify({ type: "success", message: "Success" });
    } else {
      notify({ type: "error", message: "Name should be set!" });
    }
  };

  const onChangePriority = (id: number, title: string, priority: Priority) => {
    dispatch(updateIssue({ id, title, priority }));
  };

  const onConfirmCreate = (title: string, priority: Priority) => {
    const id = new Date().getTime();
    if (title) {
      dispatch(createIssue({ id, title, priority }));
      notify({ type: "success", message: "Success" });
    } else {
      notify({ type: "error", message: "Name should be set!" });
    }
  };

  const onSetTimer = (time: { min: number; sec: number }) => {
    const value = time.min * 60 + time.sec;
    dispatch(roundTime(value));
  };

  const handlerScrumIsPlayer = () => {
    dispatch(masterPlayer(!gameSettings.masterPlayer));
  };

  const handleChangeCardInEnd = () => {
    dispatch(changingCard(!gameSettings.changingCard));
  };

  const handleIsTimerNeed = () => {
    dispatch(timer(!gameSettings.timer));
  };

  const handleScopeType = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(scoreType(target.value));
  };

  const handleScopeTypeShort = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(scoreTypeShort(target.value));
  };

  return (
    <>
      <div className={styles.lobby}>
        {!inputVisible && (
          <div className={styles.mainTitle}>
            <H1 text={sessionTitle} />
            <svg onClick={() => setInputVisible(true)} viewBox="0 0 19 18">
              <path
                d="M11.06 6.02L11.98 6.94L2.92 16H2V15.08L11.06 6.02ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z"
                fill="black"
              />
            </svg>
          </div>
        )}
        {inputVisible && (
          <div className={styles.mainTitle}>
            <InputText
              field=""
              name="gameName"
              value={sessionTitle}
              onChange={handleSessionName}
            />
            <Button
              text="confirm"
              isPrimary={true}
              onClick={onSubmitSessionName}
            />
          </div>
        )}
        <div className={styles.scramMasterTitle}>Scram Master:</div>
        <PlayerCard
          firstName={dealer.firstName}
          lastName={dealer.lastName}
          job={dealer.job}
          avatar={dealer.avatar}
          role="dealer"
          socket={dealer.socket}
          isMaster={true}
        />
        <div className={styles.link}>
          <InputText field="Link to lobby:" name="link" value={link} />
          <Button text="copy" isPrimary={true} onClick={handleCopy} />
        </div>

        <div className={styles.gameControls}>
          <Button text="start game" isPrimary={true} />
          <Button text="cancel game" />
        </div>

        <H1 text="Members:" />
        <Members
          members={users.filter((user) => user.socket !== dealer.socket)}
          onDelete={(userSocket: string) => socket.kick(userSocket)}
          isMaster={true}
        />

        <H1 text="Issues:" />
        <Issues
          issues={issues}
          onDelete={(id: number) => dispatch(deleteIssue(id))}
          onChange={onChangeIssue}
          onConfirmUpdate={onConfirmUpdate}
          onChangePriority={onChangePriority}
          onConfirmCreate={onConfirmCreate}
        />

        <H1 text="Game settings:" />
        <GameSettings
          gameSettings={gameSettings}
          onSetTimer={onSetTimer}
          handlerScrumIsPlayer={handlerScrumIsPlayer}
          handleChangeCardInEnd={handleChangeCardInEnd}
          handleIsTimerNeed={handleIsTimerNeed}
          handleScopeType={handleScopeType}
          handleScopeTypeShort={handleScopeTypeShort}
        />
      </div>
      )
    </>
  );
};
