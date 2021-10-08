import { H1 } from "../../sharedComponents/h1/H1";
import styles from "./game.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import { PlayerCard } from "../player-card/PlayerCard";
import { Issues } from "../issues/Issues";
import { useNotify } from "../../hooks/useNotify";
import { IGame, IGameSettings, IIssueCard, IUser, Priority } from "../../types";
import {
  selectAll,
  selectIssues,
  selectSessionTitle,
  selectUsers,
} from "../redux/selectors";
import { createIssue, deleteIssue, updateIssue } from "../redux/actions";
import { socketIO, socket } from "../../api/socket";
import { useState } from "react";
import { Button } from "../../sharedComponents/button/button";
import { Members } from "../../sharedComponents/members/Members";

export const Game = () => {
  const dispatch = useDispatch();

  const initialState = useSelector(selectAll);

  const users = useSelector(selectUsers);
  const issues = useSelector(selectIssues);
  const sessionTitle = useSelector(selectSessionTitle);
  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  const [session, setSession] = useState<{
    hash: string;
    users: IUser[];
    settings: IGameSettings;
    cards: string[];
    issues: IIssueCard[];
    game: IGame;
    voting: string;
  }>({
    hash: initialState.hash,
    users: initialState.users,
    settings: initialState.settings,
    cards: [
      "Unknown",
      "0",
      "1",
      "2",
      "3",
      "5",
      "8",
      "13",
      "21",
      "34",
      "55",
      "89",
    ],
    issues: initialState.issues,
    game: initialState.game,
    voting: "any",
  });

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
      dispatch(createIssue({ id, title, priority }));
      notify({ type: "success", message: "Success" });
    } else {
      notify({ type: "error", message: "Name should be set!" });
    }
  };

  // function sessionMiddleware(session: any) {
  //   if (
  //     session.game.runGame &&
  //     !session.game.endGame &&
  //     session.issues[session.game.issue] &&
  //     session.issues[session.game.issue].cards
  //   ) {
  //     // игровая промежуточная инфа раунда
  //     // const stats = getStats(session.issues[session.game.issue].cards);
  //     // const vote = getVote(session.issues[session.game.issue].cards, socket.id);
  //     // setRound({
  //     //   stats,
  //     //   vote,
  //     // });
  //   }

  //   if (session.game.endGame && session.issues.length > 0) {
  //     // если игра окончена подготовить финал стату для каждого ишью
  //     // const issues = session.issues.map((issue: any) => {
  //     //   const stats = getStats(issue.cards);
  //     //   return {
  //     //     ...issue,
  //     //     stats,
  //     //   };
  //     // });
  //     // session.issues = issues;
  //   }

  //   if (session.voting.run) {
  //     const who = session.users.find((user: any) => user.socket === session.voting.whoSocket);
  //     session.voting.who = who;

  //     const whom = session.users.find((user: any) => user.socket === session.voting.whomSocket);
  //     session.voting.whom = whom;
  //   }

  //   console.log('update', session);

  //   setSession(session);
  // }

  return (
    <div className={styles.game}>
      {console.log(setSession(session))}
      <div className={styles.gameField}>
        <div className={styles.mainTitle}>
          <H1 text={sessionTitle} />
        </div>

        <div className={styles.controlBlock}>
          <div className={styles.masterBlock}>
            <div className={styles.scramMasterTitle}>Scram Master:</div>
            {/* <PlayerCard
                firstName={dealer.firstName}
                lastName={dealer.lastName}
                job={dealer.job}
                avatar={dealer.avatar}
                role="dealer"
                socket={dealer.socket}
                isMaster={true}
              /> */}
          </div>

          <div className={styles.btnBlock}>
            <div className={styles.btnBlockTop}>
              <p className={styles.timer}>time: {session.game.time}</p>
              {isDelear ? <Button text="StopGame" /> : <Button text="Exit" />}
            </div>
            {isDelear ? (
              session.game.endRound ? (
                <div className={styles.btnBlockBottom}>
                  <Button text="Restart Round" />
                  <Button text="Next Issue" />
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

        <div className={styles.issuesContainer}></div>
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
      <div className={styles.memberList}>
        <div className={styles.columnScore}>
          <div className={styles.scoreTable}>
            {session.game.endRound ? "" : "in progress"}
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
