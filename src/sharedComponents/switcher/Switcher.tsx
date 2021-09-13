import React from "react";

import styles from "./switcher.module.scss";

type SwitcherProps = {
  value?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Switcher = React.forwardRef<HTMLInputElement, SwitcherProps>(
  function InputCheckbox(props, ref) {
    return (
      <label className={styles.switch}>
        <input
          ref={ref}
          className={styles.switch__input}
          type="checkbox"
          name={props.name}
          onChange={props.onChange}
          checked={props.value}
        />
        <span className={styles.slider} />
      </label>
    );
  }
);
