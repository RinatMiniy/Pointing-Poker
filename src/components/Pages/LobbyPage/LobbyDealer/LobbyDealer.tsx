/* eslint-disable jsx-a11y/aria-role */
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useNotify } from "../../../../hooks/useNotify";
import { H1 } from "../../../../sharedComponents/h1/H1";
import { InputText } from "../../../../sharedComponents/inputText/InputText";
import { Button } from "../../../../sharedComponents/button/button";
import { PlayerCard } from "../../../player-card/PlayerCard";
import { Members } from "../../../../sharedComponents/members/Members";
import { IIssueCard, Settings } from "../../../../types";
import { GameSettings } from "../../../game-settings/GameSettings";
import { Issues } from "../../../issues/Issues";
import { Chat } from "../../../Chat/Chat";
import {
  selectCards,
  selectIssues,
  selectSessionHash,
  selectSessionTitle,
  selectSettings,
  selectUsers,
  selectChatOpen,
} from "../../../redux/selectors";
import { requestUpdate } from "../../../redux/actions";
import { socket } from "../../../../api/socket";

import styles from "../lobby-page.module.scss";

export const LobbyDealer: React.FC = () => {
  const users = useSelector(selectUsers);
  const issues = useSelector(selectIssues);
  const gameSettings = useSelector(selectSettings);
  const cards = useSelector(selectCards);
  const link = `https://pointing-poker-team13.netlify.app/${useSelector(
    selectSessionHash
  )}`;

  const [sessionTitle, setSessionTitle] = React.useState(
    useSelector(selectSessionTitle)
  );

  const dealer = users.find((user) => user.role === "dealer");

  const [inputVisible, setInputVisible] = React.useState(false);

  const notify = useNotify();
  const chatOpen = useSelector(selectChatOpen);

  const handleSessionName = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSessionTitle(target.value);
  };

  const onSubmitSessionName = () => {
    if (sessionTitle) {
      setInputVisible(false);
      requestUpdate(Settings.title, sessionTitle);
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

  const onSetTimer = (time: { min: number; sec: number }) => {
    const value = time.min * 60 + time.sec;
    requestUpdate(Settings.settings, { ...gameSettings, roundTime: value });
  };

  const handlerScrumIsPlayer = () => {
    requestUpdate(Settings.settings, {
      ...gameSettings,
      masterPlayer: !gameSettings.masterPlayer,
    });
  };

  const handleChangeCardInEnd = () => {
    requestUpdate(Settings.settings, {
      ...gameSettings,
      changingCard: !gameSettings.changingCard,
    });
  };

  const handleIsTimerNeed = () => {
    requestUpdate(Settings.settings, {
      ...gameSettings,
      timer: !gameSettings.timer,
    });
  };

  const handleAutoLogin = () => {
    requestUpdate(Settings.settings, {
      ...gameSettings,
      autoLogin: !gameSettings.autoLogin,
    });
  };

  const handleFlipCards = () => {
    requestUpdate(Settings.settings, {
      ...gameSettings,
      flipCards: !gameSettings.flipCards,
    });
  };

  const handleScopeType = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    requestUpdate(Settings.settings, {
      ...gameSettings,
      scoreType: target.value,
    });
  };

  const handleScopeTypeShort = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    requestUpdate(Settings.settings, {
      ...gameSettings,
      scoreTypeShort: target.value,
    });
  };

  const handleChangeSetCards = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    requestUpdate(Settings.settings, {
      ...gameSettings,
      setCards: target.value,
    });
  };

  const handleAddingCard = (value) => {
    if (!value) {
      notify({ type: "error", message: "Value should be set!" });
    } else if (cards.includes(value)) {
      notify({ type: "error", message: "This value already exists" });
    } else {
      notify({ type: "success", message: "Success!" });
      requestUpdate(Settings.cards, cards.concat(value));
    }
  };

  const handleStartGame = () => {
    socket.runGame();
  };

  const handleCreateIssue = (issue: IIssueCard) => {
    requestUpdate(Settings.issues, issues.concat(issue));
  };

  const handleDeleteIssue = (id: number) => {
    const cloneIssues = [...issues];
    cloneIssues.splice(id, 1);
    requestUpdate(Settings.issues, cloneIssues);
  };

  const handleUpdateIssue = (id: number, newIssue: IIssueCard) => {
    requestUpdate(
      Settings.issues,
      issues.map((issue, idx) => (idx === id ? newIssue : issue))
    );
  };

  return (
    <>
      <div className={chatOpen ? styles.lobby_chat : styles.lobby}>
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
          <Button
            text="start game"
            isPrimary={true}
            onClick={handleStartGame}
          />
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
          handleCreateIssue={handleCreateIssue}
          handleUpdateIssue={handleUpdateIssue}
          onDelete={handleDeleteIssue}
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
          handleAutoLogin={handleAutoLogin}
          handleFlipCards={handleFlipCards}
          handleChangeSetCards={handleChangeSetCards}
          handleAddingCard={handleAddingCard}
          cards={cards}
        />
      </div>
      <Chat />
    </>
  );
};
