import React from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useNotify } from "../../hooks/useNotify";
import { Button } from "../../sharedComponents/button/button";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { Switcher } from "../../sharedComponents/switcher/Switcher";
import { requstRegistry } from "../redux/actions";
import { selectError, selectLoaded } from "../redux/selectors";

import styles from "./registerForm.module.scss";

type FormItem = {
  firstName: string;
  lastName: string;
  job: string;
  observer: boolean;
};

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormItem>();

  const loaded = useSelector(selectLoaded);

  const dispatch = useDispatch();

  const notify = useNotify();

  const error = useSelector(selectError);

  const onSubmit = (data: FormItem) => {
    dispatch(requstRegistry({ user: data }));

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
          </div>
        </form>
        <div className={styles.cancelButton}>
          <Button text="Cancel" />
          {loaded && <Redirect to="/lobby" />}
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
