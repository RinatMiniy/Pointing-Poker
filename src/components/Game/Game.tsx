/* eslint-disable jsx-a11y/aria-role */
import { H1 } from "../../sharedComponents/h1/H1";
import styles from "./game.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { PlayerCard } from "../player-card/PlayerCard";
import { Issues } from "../issues/Issues";
import { IIssueCard, Settings } from "../../types";
import {
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
              valueCardsInIssue.push("Unknown");
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

              <div className={styles.btnBlock}>
                <div className={styles.btnBlockTop}>
                  <p className={styles.timer}>time: {state.game.time}</p>
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
                {isDelear ? (
                  state.game.endRound ? (
                    <div className={styles.btnBlockBottom}>
                      <Button text="Restart Round" onClick={socket.runRound} />
                      {console.log("")}
                      {!(state.issues.length === state.game.issue + 1) ? (
                        <Button
                          text="Next Issue"
                          onClick={() =>
                            socketIO.emit("newRound", state.game.issue + 1)
                          }
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
                      <Button text="Run Round" onClick={socket.runRound} />
                    </div>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className={styles.mainBlock}>
              <div className={styles.issuesContainer}>
                <H1 text="Issues:" />
                <Issues
                  issues={issues}
                  handleCreateIssue={handleCreateIssue}
                  handleUpdateIssue={handleUpdateIssue}
                  onDelete={handleDeleteIssue}
                />
              </div>

              <div className={styles.statisticBlock}>
                {state.game.endRound && (
                  <div>
                    {Object.keys(statistic[0]).map((key) => (
                      <li key={key}>
                        {key} - {statistic[0][key]}
                      </li>
                    ))}
                  </div>
                )}
              </div>
            </div>

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
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.memberList}>
            <div className={styles.columnScore}>
              {users.map((value, index) => {
                return (
                  <div className={styles.scoreTable} key={index}>
                    {state.game.endRound
                      ? valueCardsInIssue[index]
                      : "in progress"}
                  </div>
                );
              })}
            </div>

            <div className={styles.columnMembers}>
              <Members members={users} isMaster={false} />
            </div>
          </div>
        </>
      ) : (
        <GameResult />
      )}
    </div>
  );
};
