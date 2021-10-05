import React from "react";
import { Button } from "../../sharedComponents/button/button";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { RegisterForm } from "../registerForm/RegisterForm";
import styles from "./mainPage.module.scss";
import cn from "classnames";

export const MainPage: React.FC = () => {
  const [openRegistration, setOpenRegistration] = React.useState(false);

  return (
    <div className={styles.mainPage}>
      <img
        src="./mainPageLogo.jpg"
        alt="mainPageLogo"
        className={styles.mainLogo}
      />
      <h2 className={styles.mainTitle}>Start your planning:</h2>
      <div className={cn(styles.mainLabel, styles.fixlabel)}>
        <p>Create session:</p>
        <Button
          text="Start new game"
          isPrimary={true}
          isLong={true}
          onClick={() => setOpenRegistration(true)}
        />
      </div>
      <h2 className={styles.mainTitle}>OR:</h2>
      <div className={styles.mainLabel}>
        <p> Connect to lobby by URL:</p>
        <div className={styles.connectLobby}>
          <InputText field="" name="linkLobby" />
          <Button text="Connect" isPrimary={true} isLong={true} />
        </div>
      </div>
      {openRegistration && (
        <RegisterForm
          setOpenRegistration={(event: boolean) => setOpenRegistration(event)}
        />
      )}
    </div>
  );
};
