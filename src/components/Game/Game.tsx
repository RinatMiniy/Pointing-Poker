/* eslint-disable jsx-a11y/aria-role */
import React from "react";
import { H1 } from "../../sharedComponents/h1/H1";
import styles from "./game.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { PlayerCard } from "../player-card/PlayerCard";
import { Issues } from "../issues/Issues";
import { IIssueCard, Settings } from "../../types";
import { TimeField } from "../time-field/TimeField";
import {
  selectActiveIssue,
  selectIssues,
  selectSessionTitle,
  selectState,
  selectUsers,
} from "../redux/selectors";
import { requestUpdate, reset } from "../redux/actions";
import { socketIO, socket } from "../../api/socket";
import { Button } from "../../sharedComponents/button/button";
import { Members } from "../../sharedComponents/members/Members";
import { GameCard } from "../../sharedComponents/game-card/GameCard";
import { Link, useParams } from "react-router-dom";
import { GameResult } from "../GameResult/GameResult";
import { LoginRequest } from "../loginRequest/LoginRequest";

let statistic = [];

export const Game = () => {
  interface IRouteParams {
    id: string;
  }
  const dispatch = useDispatch();

  const state = useSelector(selectState);

  const users = useSelector(selectUsers);
  const issues = useSelector(selectIssues);
  const sessionTitle = useSelector(selectSessionTitle);
  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  const dealerNotActive = isDelear && !state.settings.masterPlayer;

  const activeUser = users.find((user) => user.socket === socketIO.id);
  const isSpectator = activeUser.role === "spectator";

  const valueCardsInIssue = [];

  const { id } = useParams<IRouteParams>();

  const handleCreateIssue = (issue: IIssueCard) => {
    requestUpdate(Settings.issues, issues.concat(issue));
  };

  const handleDeleteIssue = (id: number) => {
    const cloneIssues = [...issues];
    cloneIssues.splice(id, 1);
    requestUpdate(Settings.issues, cloneIssues);
  };

  const activeIssue = useSelector(selectActiveIssue);

  const handleUpdateIssue = (id: number, newIssue: IIssueCard) => {
    requestUpdate(
      Settings.issues,
      issues.map((issue, idx) => (idx === id ? newIssue : issue))
    );
  };
  {
    if (state.game.endRound) {
      state.users.map((user) => {
        console.log("user", user);
        if (state.issues[state.game.issue].cards.length) {
          for (
            let i = 0;
            i < state.issues[state.game.issue].cards.length;
            i++
          ) {
            console.log(
              "state.issues[state.game.issue].cards[i].userSocket",
              state.issues[state.game.issue].cards[i].userSocket
            );
            if (
              user.socket === state.issues[state.game.issue].cards[i].userSocket
            ) {
              valueCardsInIssue.push(
                state.issues[state.game.issue].cards[i].cardValue
              );
              break;
            } else if (i === state.issues[state.game.issue].cards.length - 1) {
              if (
                !(
                  user.socket === dealer.socket && !state.settings.masterPlayer
                ) &&
                !(user.role === "spectator")
              ) {
                valueCardsInIssue.push("Unknown");
              }
            }
          }
        } else {
          valueCardsInIssue.push("Unknown");
        }
      });
      const statisticRound = {};
      valueCardsInIssue.forEach(function (a) {
        statisticRound[a] = +statisticRound[a] + 1 || 1;
      });
      statistic = [statisticRound];
      console.log(statistic);
    }
  }

  const [activeCard, setActiveCard] = React.useState<number | null>(null);

  return (
    <div className={styles.game}>
      {!state.game.endGame ? (
        <>
          <div className={styles.gameField}>
            <div className={styles.mainTitle}>
              <H1 text={sessionTitle} />
            </div>

            <div className={styles.controlBlock}>
              <div className={styles.masterBlock}>
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
              </div>
              {isDelear ? (
                <Link
                  to={{
                    pathname: "/",
                    state: { hash: id },
                  }}
                >
                  <Button
                    onClick={() => {
                      socket.exit;
                      dispatch(reset());
                    }}
                    text="StopGame"
                  />
                </Link>
              ) : (
                <Button text="Exit" />
              )}
            </div>

            <div className={styles.mainBlock}>
              <div className={styles.issuesContainer}>
                <H1 text="Issues:" />
                <div className={styles.blockIssues}>
                  <Issues
                    issues={issues}
                    handleCreateIssue={handleCreateIssue}
                    handleUpdateIssue={handleUpdateIssue}
                    onDelete={handleDeleteIssue}
                    activeIssue={activeIssue}
                  />

                  <div className={styles.btnBlock}>
                    <TimeField
                      min={Math.floor(+state.settings.roundTime / 60)}
                      sec={+state.settings.roundTime % 60}
                      onSetTimer={null}
                      isLobby={false}
                      disabled={true}
                    />

                    {isDelear ? (
                      state.game.endRound ? (
                        <div className={styles.btnBlockBottom}>
                          <Button
                            text="Restart Round"
                            onClick={socket.runRound}
                          />
                          {!(state.issues.length === state.game.issue + 1) ? (
                            <Button
                              text="Next Issue"
                              onClick={() => {
                                setActiveCard(null);
                                socketIO.emit("newRound", state.game.issue + 1);
                              }}
                              isPrimary={true}
                            />
                          ) : (
                            <Button
                              text="End Game"
                              onClick={() => socketIO.emit("endGame")}
                            />
                          )}
                        </div>
                      ) : (
                        <div className={styles.btnBlockBottom}>
                          {state.game.runRound ? (
                            <></>
                          ) : (
                            <Button
                              text="Run Round"
                              onClick={socket.runRound}
                            />
                          )}
                        </div>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statisticBlock}>
              {state.game.endRound && (
                <div>
                  <H1 text="Statistics:" />
                  <div className={styles.results}>
                    {Object.keys(statistic[0]).map((key, idx) => {
                      console.log(statistic[0], "static[0]");
                      const votes = Object.values(statistic[0]).reduce(
                        (sum, el) => +el + +sum,
                        0
                      ) as number;
                      return (
                        <div key={key}>
                          <GameCard
                            id={idx}
                            value={key}
                            sessionShortTitle={state.settings.scoreTypeShort}
                            cards={state.cards}
                            isRunGame={true}
                          />
                          <div className={styles.percent}>
                            {Math.round((+statistic[0][key] / votes) * 100)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {!dealerNotActive && !isSpectator && (
              <div className={styles.cards}>
                {state.cards.map((card, idx) => (
                  <GameCard
                    key={card}
                    id={idx}
                    value={card}
                    sessionShortTitle={state.settings.scoreTypeShort}
                    cards={state.cards}
                    onClick={() => {
                      socketIO.emit("cardSelection", card);
                      setActiveCard(idx);
                    }}
                    isRunGame={true}
                    isActiveCard={
                      idx === activeCard &&
                      (state.game.runRound || state.settings.changingCard)
                    }
                    disabled={
                      !state.settings.changingCard && !state.game.runRound
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.memberList}>
            <div className={styles.columnScore}>
              <H1 text="Score" />
              {users.map((value, index) => {
                return (
                  <div className={styles.scoreTable} key={index}>
                    {state.game.endRound
                      ? valueCardsInIssue[index] || "spectator"
                      : "In progress"}
                  </div>
                );
              })}
            </div>

            <div className={styles.columnMembers}>
              <H1 text="Players" />
              <Members members={users} isMaster={false} />
            </div>
          </div>
        </>
      ) : (
        <GameResult />
      )}
      <LoginRequest />
    </div>
  );
};
