import React from "react";
import { Button } from "../../../sharedComponents/button/button";
import { InputText } from "../../../sharedComponents/inputText/InputText";
import { RegisterForm } from "../../registerForm/RegisterForm";
import styles from "./mainPage.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { requestSession } from "../../redux/actions";
import { useNotify } from "../../../hooks/useNotify";
import { ToastContainer } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";

interface ILocation {
  state: {
    hash?: string;
    kick?: boolean;
  };
}

export const MainPage: React.FC = () => {
  const history = useHistory();
  const location: ILocation = useLocation();

  const [openRegistration, setOpenRegistration] = React.useState(false);
  const [isMaster, setIsMaster] = React.useState(false);
  const [link, setLink] = React.useState(
    location.state && location.state.hash ? location.state.hash : ""
  );

  const dispatch = useDispatch();

  const notify = useNotify();

  const onInputLink = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.value.indexOf("http") !== -1) {
      const hash = target.value.split("/").reverse()[0];
      setLink(hash);
    } else {
      setLink(target.value);
    }
  };

  const onSendLink = async (link: string) => {
    return dispatch(requestSession({ link }));
  };

  const onConnect = async () => {
    setIsMaster(false);
    try {
      const sessionExist = await onSendLink(link);
      sessionExist
        ? setOpenRegistration(true)
        : notify({ type: "error", message: "Session doesn't exist" });
    } catch (e) {
      notify({ type: "error", message: "Unexpected error" });
    }
  };

  React.useEffect(() => {
    if (location.state) {
      if (location.state.hash) {
        history.replace({
          state: null,
        });
        onConnect();
      }
      if (location.state.kick) {
        history.replace({
          state: null,
        });
        notify({ type: "error", message: "You were kicked" });
      }
    }
  }, []);

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
          onClick={() => {
            setOpenRegistration(true);
            setIsMaster(true);
          }}
        />
      </div>
      <h2 className={styles.mainTitle}>OR:</h2>
      <div className={styles.mainLabel}>
        <p>Connect to lobby by URL or HASH:</p>
        <div className={styles.connectLobby}>
          <InputText field="" name="linkLobby" onChange={onInputLink} />
          <Button
            text="Connect"
            isPrimary={true}
            isLong={true}
            onClick={onConnect}
          />
        </div>
      </div>
      {openRegistration && (
        <RegisterForm
          isMaster={isMaster}
          onCancel={() => setOpenRegistration(false)}
          hash={link}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    </div>
  );
};
