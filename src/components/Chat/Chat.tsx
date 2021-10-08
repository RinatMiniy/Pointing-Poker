import React from "react";
import { useSelector } from "react-redux";
import { selectSessionHash, selectChatOpen } from "../redux/selectors";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { Button } from "../../sharedComponents/button/button";
import styles from "./chat.module.scss";

export const Chat: React.FC = () => {
  const hash = useSelector(selectSessionHash);
  const chatOpen = useSelector(selectChatOpen);

  return (
    <>
      {hash && chatOpen && (
        <div className={styles.chat}>
          <div className={styles.mainTitle}>
            <form>
              <InputText field="" name="msg" value="" />
              <Button text="Send" isPrimary={true} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
