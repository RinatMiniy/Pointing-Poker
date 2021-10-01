import React from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useNotify } from "../../hooks/useNotify";
import { Button } from "../../sharedComponents/button/button";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { Switcher } from "../../sharedComponents/switcher/Switcher";
import { requestLogin, requestRegistry } from "../redux/actions";
import {
  selectError,
  selectLoaded,
  selectSessionHash,
} from "../redux/selectors";

import styles from "./registerForm.module.scss";

type FormItem = {
  firstName: string;
  lastName: string;
  job: string;
  avatar: string;
  observer: boolean;
};

type IRegistrationFormProps = {
  isMaster: boolean;
  hash?: string;
  onCancel: () => void;
};

export const RegisterForm: React.FC<IRegistrationFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormItem>();

  const loaded = useSelector(selectLoaded);
  const hash = useSelector(selectSessionHash);

  const dispatch = useDispatch();

  const notify = useNotify();

  const error = useSelector(selectError);

  const onSubmit = (data: FormItem) => {
    if (props.isMaster) {
      dispatch(requestRegistry({ user: { ...data, role: "delear" } }));
    } else {
      // socket.login(props.hash, { ...data, role: "player" }, (mess: string) => {
      //   if (mess === "вошел") {
      //     dispatch(requestRegistry({ user: { ...data, role: "player" } }));
      //   }
      // });
      dispatch(
        requestLogin({ hash: props.hash, user: { ...data, role: "player" } })
      );
    }

    error
      ? notify({ type: "error", message: error })
      : notify({ type: "success", message: "Succes" });

    reset();
  };

  React.useEffect(() => {
    register("firstName", {
      validate: (value) => !!value.length || "Name shoud be set!",
    });
  }, [register]);

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.registerForm}>
        <h3 className={styles.connectToLobby}>Connect to lobby</h3>
        <form className={styles.formRegister} onSubmit={handleSubmit(onSubmit)}>
          <InputText
            field="Your first name:"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <InputText
            field="Your last name (optional):"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <InputText
            field="Your job position (optional):"
            {...register("job")}
          />
          <div className={styles.label}>Image:</div>
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            Choose file
          </label>
          <input type="file" id="fileInput" className={styles.fileInput} />
          <div className={styles.observerWrapper}>
            <div className={styles.label}>Connect as Observer</div>
            <Switcher {...register("observer")} />
          </div>
          <div className={styles.confirmButton}>
            <Button text="Confirm" isPrimary={true} />
            {loaded && (
              <Redirect to={`/${props.isMaster ? hash : props.hash}`} />
            )}
          </div>
        </form>
        <div className={styles.cancelButton}>
          <Button text="Cancel" onClick={props.onCancel} />
        </div>
      </div>
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
    </>
  );
};
