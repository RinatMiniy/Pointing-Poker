import React from "react";

import styles from "./button.module.scss";

type IButtonProps = {
  text: string;
};

export const Button: React.FC<IButtonProps> = () => {
  return <button className={styles.button}></button>;
};
