import React, { ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import { useNotify } from "../../../hooks/useNotify";
import { H1 } from "../../../sharedComponents/h1/H1";
import { InputText } from "../../../sharedComponents/inputText/InputText";
import { Button } from "../../../sharedComponents/button/button";
import { PlayerCard } from "../../player-card/PlayerCard";
import { Members } from "../../../sharedComponents/members/Members";
import { IUser, IIssueCard, Priority, IGameSettings } from "../../../types";
import { GameSettings } from "../../game-settings/GameSettings";

import styles from "./lobby-page.module.scss";
import { Issues } from "../../issues/Issues";

type ISessionData = {
  sessionName: string;
  link: string;
};

export const LobbyPage: React.FC = () => {
  const [users, setUsers] = React.useState<IUser[]>([
    {
      id: 1,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
    {
      id: 2,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
    {
      id: 3,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
    {
      id: 4,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
    {
      id: 5,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
    {
      id: 6,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
    {
      id: 7,
      firstName: "Anna",
      lastName: "Smith",
      isActive: false,
      job: "reseacher",
      userRole: "player",
    },
  ]);

  const [issues, setIssues] = React.useState<IIssueCard[]>([
    {
      id: 1,
      title: "issue 542",
      priority: Priority.low,
    },
  ]);

  const [gameSettings, setGameSettings] = React.useState<IGameSettings>({
    scramIsPlayer: false,
    changeCardInEnd: false,
    isTimerNeed: false,
    scoreType: "",
    scoreTypeShort: "",
    time: {
      min: 2,
      sec: 20,
    },
  });

  const [sessionData, setSessionData] = React.useState<ISessionData>({
    sessionName: "Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)",
    link: "http://pockerplanning.chttp://pockerplanning.chttp://pockerplanning.chttp://pockerplanning.c",
  });
  const [inputVisible, setInputVisible] = React.useState(false);

  const notify = useNotify();

  const handleSessionName = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSessionData({ ...sessionData, sessionName: target.value });
  };

  const onSubmitSessionName = () => {
    if (sessionData.sessionName) {
      setInputVisible(false);
    } else {
      notify({
        type: "error",
        message: "Name should be set!",
      });
    }
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(sessionData.link);

    notify({
      type: "success",
      message: "Copy",
    });
  };

  const onChangeIssue = (id: number, title: string) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, title: title } : issue
      )
    );
  };

  const onConfirmUpdate = (title: string) => {
    if (title) {
      notify({ type: "success", message: "Success" });
    } else {
      notify({ type: "error", message: "Name should be set!" });
    }
  };

  const onChangePriority = (id: number, priority: Priority) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, priority: priority } : issue
      )
    );
  };

  const onConfirmCreate = (title: string, priority: Priority) => {
    if (title) {
      setIssues(issues.concat({ id: issues.length, title, priority }));
      notify({ type: "success", message: "Success" });
    } else {
      notify({ type: "error", message: "Name should be set!" });
    }
  };

  const onSetMinutes = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setGameSettings({
      ...gameSettings,
      time: { min: +target.value, sec: gameSettings.time.sec },
    });
  };

  const onSetSeconds = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setGameSettings({
      ...gameSettings,
      time: { sec: +target.value, min: gameSettings.time.min },
    });
  };

  const handlerScrumIsPlayer = () => {
    setGameSettings({
      ...gameSettings,
      scramIsPlayer: !gameSettings.scramIsPlayer,
    });
  };

  const handleChangeCardInEnd = () => {
    setGameSettings({
      ...gameSettings,
      changeCardInEnd: !gameSettings.changeCardInEnd,
    });
  };

  const handleIsTimerNeed = () => {
    setGameSettings({
      ...gameSettings,
      isTimerNeed: !gameSettings.isTimerNeed,
    });
  };

  const handleScopeType = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setGameSettings({
      ...gameSettings,
      scoreType: target.value,
    });
  };

  const handleScopeTypeShort = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setGameSettings({
      ...gameSettings,
      scoreTypeShort: target.value,
    });
  };

  return (
    <div className={styles.lobby}>
      {!inputVisible && (
        <div className={styles.mainTitle}>
          <H1 text={sessionData.sessionName} />
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
            value={sessionData.sessionName}
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
        id={0}
        firstName="Marina"
        lastName="Golovanova"
        isActive={true}
        job="designer"
        userRole="admin"
      />
      <div className={styles.link}>
        <InputText
          field="Link to lobby:"
          name="link"
          value={sessionData.link}
        />
        <Button text="copy" isPrimary={true} onClick={handleCopy} />
      </div>

      <div className={styles.gameControls}>
        <Button text="start game" isPrimary={true} />
        <Button text="cancel game" />
      </div>

      <H1 text="Members:" />
      <Members
        members={users}
        onDelete={(id: number) =>
          setUsers(users.filter((user) => user.id !== id))
        }
      />

      <H1 text="Issues:" />
      <Issues
        issues={issues}
        onDelete={(id: number) =>
          setIssues(issues.filter((issue) => issue.id !== id))
        }
        onChange={onChangeIssue}
        onConfirmUpdate={onConfirmUpdate}
        onChangePriority={onChangePriority}
        onConfirmCreate={onConfirmCreate}
      />

      <H1 text="Game settings:" />
      <GameSettings
        gameSettings={gameSettings}
        onSetMinutes={onSetMinutes}
        onSetSeconds={onSetSeconds}
        handlerScrumIsPlayer={handlerScrumIsPlayer}
        handleChangeCardInEnd={handleChangeCardInEnd}
        handleIsTimerNeed={handleIsTimerNeed}
        handleScopeType={handleScopeType}
        handleScopeTypeShort={handleScopeTypeShort}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    </div>
  );
};
