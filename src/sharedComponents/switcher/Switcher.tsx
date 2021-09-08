import React from "react";

import styles from "./switcher.module.scss";

export const Switcher: React.FC = () => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" />
      <span className={styles.slider} />
    </label>
  );
};
