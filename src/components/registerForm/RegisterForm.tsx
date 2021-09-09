import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../sharedComponents/button/button";
import { InputText } from "../../sharedComponents/inputText/InputText";

import styles from "./registerForm.module.scss";

type FormItem = {
  firstName: string;
  lastName: string;
  position: string;
};

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormItem>({});

  const onSubmit = (data: FormItem) => {
    reset();
    console.log(data);
  };

  React.useEffect(() => {
    register("firstName", {
      validate: (value) => !!value.length || "Name shoud be set!",
    });
    register("lastName", {
      validate: (value) => !!value.length || "Surname shoud be set!",
    });
  }, [register]);

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.registerForm}>
        <h3 className={styles.connectToLobby}>Connect to lobby</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputText
            field="Your first name:"
            {...register("firstName")}
            type="text"
            error={errors.firstName?.message}
          />
          <InputText
            field="Your last name (optional):"
            {...register("lastName")}
            type="text"
            error={errors.lastName?.message}
          />
          <InputText
            field="Your job position (optional):"
            {...register("position")}
            type="date"
            error={errors.position?.message}
          />
          <Button text="Confirm" isPrimary={true} />
        </form>
      </div>
    </>
  );
};
