import React from "react";

import styles from "./h1.module.scss";

type H1Props = {
  text: string;
};

export const H1: React.FC<H1Props> = (props) => {
  return (
    <div className={styles.h1}>
      <h1>{props.text}</h1>
    </div>
  );
};
