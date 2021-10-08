/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionHash, selectChatOpen } from "../redux/selectors";
import { changeChatOpen } from "../redux/actions";
import styles from "./header.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const hash = useSelector(selectSessionHash);
  const chatOpen = useSelector(selectChatOpen);

  return (
    <header className={styles.header}>
      <div className={styles.blue__line}>
        {hash && (
          <div
            className={styles.chat}
            onClick={() => dispatch(changeChatOpen(!chatOpen))}
          >
            {!chatOpen && (
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.9 1.9H17.1V13.3H3.0115L1.9 14.4115V1.9ZM1.9 0C0.855 0 0.00949999 0.855 0.00949999 1.9L0 19L3.8 15.2H17.1C18.145 15.2 19 14.345 19 13.3V1.9C19 0.855 18.145 0 17.1 0H1.9ZM3.8 9.5H11.4V11.4H3.8V9.5ZM3.8 6.65H15.2V8.55H3.8V6.65ZM3.8 3.8H15.2V5.7H3.8V3.8Z"
                  fill="white"
                />
              </svg>
            )}
            {chatOpen && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.4457 8.88933L17.7787 15.5563L24.4457 22.2233L22.2234 24.4457L15.5563 17.7787L8.88934 24.4457L6.66701 22.2233L13.334 15.5563L6.66701 8.88933L8.88934 6.66699L15.5563 13.334L22.2234 6.66699L24.4457 8.88933Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      <div className={styles.aquamarine__line}></div>
      <img className={styles.logo} src="./logo.svg" alt="logo" />
    </header>
  );
};
