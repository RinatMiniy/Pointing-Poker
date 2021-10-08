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
import { deleteIssue, requestUpdate, updateIssue } from "../redux/actions";
import { socketIO, socket } from "../../api/socket";
import { Button } from "../../sharedComponents/button/button";
import { Members } from "../../sharedComponents/members/Members";
import { GameCard } from "../../sharedComponents/game-card/GameCard";

export const Game = () => {
  const dispatch = useDispatch();

  const state = useSelector(selectAll);

  const users = useSelector(selectUsers);
  const issues = useSelector(selectIssues);
  const sessionTitle = useSelector(selectSessionTitle);
  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

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

  return (
    <div className={styles.game}>
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
                <Button onClick={socket.exit} text="StopGame" />
              ) : (
                <Button text="Exit" />
              )}
            </div>
            {isDelear ? (
              state.game.endRound ? (
                <div className={styles.btnBlockBottom}>
                  <Button text="Restart Round" onClick={socket.runRound} />
                  <Button
                    text="Next Issue"
                    onClick={() =>
                      socketIO.emit("newRound", state.game.issue + 1)
                    }
                  />
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
          <div className={styles.scoreTable}>
            {state.game.endRound ? "" : "in progress"}
          </div>
        </div>

        <div className={styles.columnMembers}>
          <Members
            members={users.filter((user) => user.socket !== dealer.socket)}
            isMaster={false}
          />
        </div>
      </div>
    </div>
  );
};
