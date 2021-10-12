import React from "react";
import { Button } from "../../sharedComponents/button/button";
import { H1 } from "../../sharedComponents/h1/H1";
import { PopupOverlay } from "../../sharedComponents/popup-overlay/PopupOverlay";
import { socket, socketIO } from "../../api/socket";
import styles from "./loginRequest.module.scss";
import { IUser } from "../../types";
import { useSelector } from "react-redux";
import { selectUsers } from "../redux/selectors";

export const LoginRequest: React.FC = () => {
  const users = useSelector(selectUsers);
  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  const [requests, setRequests] = React.useState<IUser[]>([]);

  socket.loginRequestNotification((user: IUser) => {
    setRequests((prev) => [...prev, user]);
  });

  if (requests.length && isDelear) {
    return (
      <>
        <PopupOverlay />
        {requests.map((user, index) => (
          <div key={index} className={styles.loginRequest}>
            <div>
              <H1 text="Login request" />
              <p className={styles.loginRequest__text}>
                {user.firstName} {user.lastName} wants to join the game.
              </p>
              <p className={styles.loginRequest__text}>Do you agree?</p>
            </div>
            <div className={styles.controls}>
              <Button
                text="Yes"
                isPrimary={true}
                onClick={() => {
                  socket.loginAllow(user);
                  setRequests((prev) =>
                    prev.filter((item) => item.socket !== user.socket)
                  );
                }}
              />
              <Button
                text="No"
                onClick={() => {
                  socket.loginDeny(user);
                  setRequests((prev) =>
                    prev.filter((item) => item.socket !== user.socket)
                  );
                }}
              />
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return null;
  }
};
