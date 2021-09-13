import { Button } from "../../sharedComponents/button/button";
import { InputText } from "../../sharedComponents/inputText/InputText";
import styles from "./mainPage.module.scss";

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <img
        src="./mainPageLogo.jpg"
        alt="mainPageLogo"
        className={styles.mainLogo}
      />
      <h2 className={styles.mainTitle}>Start your planning:</h2>
      {/* <label className = {styles.mainLabel}> */}
      <p>Create session:</p>
      <Button text="Start new game" isPrimary={true} isLong={true} />
      {/* </label> */}
      <h2 className={styles.mainTitle}>OR:</h2>
      {/* <label className = {styles.mainLabel}> */}
      <p> Connect to lobby by URL:</p>
      <div className={styles.connectLobby}>
        <InputText field="" name="linkLobby" />
        <Button text="Connect" isPrimary={true} isLong={true} />
      </div>
      {/* </label> */}
    </div>
  );
};
