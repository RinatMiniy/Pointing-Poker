/* eslint-disable jsx-a11y/aria-role */
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useNotify } from "../../../../hooks/useNotify";
import { H1 } from "../../../../sharedComponents/h1/H1";
import { Button } from "../../../../sharedComponents/button/button";
import { PlayerCard } from "../../../player-card/PlayerCard";
import { Members } from "../../../../sharedComponents/members/Members";
import { selectSessionTitle, selectUsers } from "../../../redux/selectors";
import { socket } from "../../../../api/socket";

import styles from "../lobby-page.module.scss";

export const LobbyPlayer: React.FC = () => {
  const users = useSelector(selectUsers);
  const [isDeletedUser, setDeletedUser] = React.useState(false);
  const [isUserExit, setUserExit] = React.useState(false);

  const sessionTitle = useSelector(selectSessionTitle);
  const dealer = users.find((user) => user.role === "dealer");

  const notify = useNotify();

  socket.kickForUserNotification(() => {
    notify({ type: "error", message: "You were kicked" });
    setTimeout(() => {
      debugger;
      setDeletedUser(true);
    }, 3000);
  });

  const handleExit = () => {
    socket.exit();
    setUserExit(true);
  };

  return (
    <>
      <div className={styles.lobby}>
        <div className={styles.mainTitle}>
          <H1 text={sessionTitle} />
        </div>

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

        <div className={styles.exit}>
          <Button text="Exit" onClick={handleExit} />
        </div>

        <H1 text="Members:" />
        <Members
          members={users.filter((user) => user.socket !== dealer.socket)}
          isMaster={false}
        />

        {(isDeletedUser || isUserExit) && <Redirect to="/" />}
      </div>
    </>
  );
};
