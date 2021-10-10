/* eslint-disable jsx-a11y/aria-role */
import { H1 } from "../../sharedComponents/h1/H1";
import styles from "./game.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { PlayerCard } from "../player-card/PlayerCard";
import { Issues } from "../issues/Issues";
import { useNotify } from "../../hooks/useNotify";
import { Priority, Settings } from "../../types";
import {
  selectAll,
  selectIssues,
  selectSessionTitle,
  selectUsers,
} from "../redux/selectors";
import {
  deleteIssue,
  requestUpdate,
  reset,
  updateIssue,
} from "../redux/actions";
import { socketIO, socket } from "../../api/socket";
import { Button } from "../../sharedComponents/button/button";
import { Members } from "../../sharedComponents/members/Members";
import { GameCard } from "../../sharedComponents/game-card/GameCard";
import { Link } from "react-router-dom";
import { GameResult } from "../GameResult/GameResult";

let statistic = [];

export const Game = () => {
  const dispatch = useDispatch();

  const state = useSelector(selectAll);

  const users = useSelector(selectUsers);
  const issues = useSelector(selectIssues);
  const sessionTitle = useSelector(selectSessionTitle);
  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  const valueCardsInIssue = [];

  const notify = useNotify();

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
      requestUpdate(Settings.issues, issues.concat({ id, title, priority }));
      notify({ type: "success", message: "Success" });
    } else {
      notify({ type: "error", message: "Name should be set!" });
    }
  };

  // function getStats(cards) {
  //   const result = {};

  //   cards.forEach((card: { userSocket: string; cardValue: string }) => {
  //     if (result[card.cardValue]) {
  //       result[card.cardValue]++;
  //     } else {
  //       result[card.cardValue] = 1;
  //     }
  //   });

  //   return result;
  // }

  // function getVote(cards: any, id: string) {
  //   const card = cards.find(
  //     (card: { userSocket: string; cardValue: string }) => card.userSocket === id,
  //   );
  //   return card ? card.cardValue : null;
  // }

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
          //   state.issues[state.game.issue].cards.map((value:{userSocket:string, cardValue:string}, index) => {
          //   if (user.socket === value.userSocket) {
          //     valueCardsInIssue.push(value.cardValue)
          //     index++
          //   } else if (index === state.issues[state.game.issue].cards.length - 1) {
          //     console.log("index", index, "state.issues[state.game.issue].cards.length - 1", state.issues[state.game.issue].cards.length - 1)
          //     valueCardsInIssue.push("unknown")
          //   }

          // })
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
                    <Link to={"/"}>
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
                  onDelete={(id: number) => dispatch(deleteIssue(id))}
                  onChange={onChangeIssue}
                  onConfirmUpdate={onConfirmUpdate}
                  onChangePriority={onChangePriority}
                  onConfirmCreate={onConfirmCreate}
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
