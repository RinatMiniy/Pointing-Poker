import React from "react";
import cn from "classnames";

import styles from "./inputText.module.scss";

type FormItemProps = {
  field: string;
  value?: string;
  onChange?: (e: React.ChangeEvent) => void;
  name: string;
  error?: string;
  isSmall?: boolean;
};

export const InputText: React.FC<FormItemProps> = (props) => {
  return (
    <>
      <label className={cn(styles.label, { [styles.errorLabel]: props.error })}>
        {props.field}
        <div className={styles.label__error}>{props.error}</div>
      </label>
      {console.log(props.value, "tet")}
      <input
        className={cn(styles.inputText, {
          [styles["inputText--small"]]: props.isSmall,
        })}
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};
