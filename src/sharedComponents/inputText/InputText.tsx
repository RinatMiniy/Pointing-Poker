import React from "react";
import cn from "classnames";

import styles from "./inputText.module.scss";

type FormItemProps = {
  field: string;
  value?: string;
  onChange?: (e: React.ChangeEvent) => void;
  name: string;
  type?: string;
  error?: string;
  isSmall?: boolean;
};

export const InputText = React.forwardRef<HTMLElement, FormItemProps>(
  function FormItem(props, ref) {
    return (
      <>
        <label
          className={cn(styles.label, { [styles.errorLabel]: props.error })}
        >
          {props.field}
          <div className={styles.label__error}>{props.error}</div>
        </label>
        <input
          ref={ref as React.ForwardedRef<HTMLInputElement>}
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
  }
);
