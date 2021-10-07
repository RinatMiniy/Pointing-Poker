/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useSelector } from "react-redux";
import { selectSessionHash } from "../redux/selectors";
import styles from "./header.module.scss";

export const Header = () => {
  const hash = useSelector(selectSessionHash);
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.blue__line}>
        {hash && (
          <div className={styles.chat} onClick={() => setChatOpen(!chatOpen)}>
            {!chatOpen && (
              <img
                className={styles.chat__logo}
                src="./iconChat.svg"
                alt="iconChat"
              />
            )}
            {chatOpen && (
              <img
                className={styles.chat__logo}
                src="./iconChatClose.svg"
                alt="iconChatClose"
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.aquamarine__line}></div>
      <img className={styles.logo} src="./logo.svg" alt="logo" />
    </header>
  );
};
