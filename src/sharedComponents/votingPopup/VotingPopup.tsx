import React from "react";
import { Button } from "../button/button";
import { H1 } from "../h1/H1";
import { PopupOverlay } from "../popup-overlay/PopupOverlay";
import { socket } from "../../api/socket";
import { useSelector } from "react-redux";
import { selectUsers } from "../../components/redux/selectors";
import styles from "./votingPopup.modules.scss";

type IVotingPopup = {
  whoSocket: string;
  whomSocket: string;
};

export const VotingPopup: React.FC<IVotingPopup> = (props) => {
  const users = useSelector(selectUsers);
  const whoUser = users.find((user) => user.socket === props.whoSocket);
  const whomUser = users.find((user) => user.socket === props.whomSocket);

  return (
    <>
      <PopupOverlay />
      <div className={styles.votingPopup}>
        <div>
          <H1 text="Kick" />
          <p className={styles.votingPopup__text}>
            {whoUser.firstName} {whoUser.lastName} want to kick member{" "}
            {whomUser.firstName} {whomUser.lastName}. Do you agree with it?
          </p>
        </div>
        <div className={styles.controls}>
          <Button
            text="Yes"
            isPrimary={true}
            onClick={() => socket.vote("yes")}
          />
          <Button text="No" onClick={() => socket.vote("no")} />
        </div>
      </div>
    </>
  );
};
