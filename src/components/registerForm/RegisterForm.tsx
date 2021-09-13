import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../sharedComponents/button/button";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { Switcher } from "../../sharedComponents/switcher/Switcher";

import styles from "./registerForm.module.scss";

type FormItem = {
  firstName: string;
  lastName: string;
  position: string;
  observer: boolean;
};

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormItem>();

  const onSubmit = (data: FormItem) => {
    console.log(data);
    reset();
  };

  React.useEffect(() => {
    register("firstName", {
      validate: (value) => !!value.length || "Name shoud be set!",
    });
    register("lastName", {
      validate: (value) => !!value.length || "Last name shoud be set!",
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
            {...register("position")}
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
        </div>
      </div>
    </>
  );
};
