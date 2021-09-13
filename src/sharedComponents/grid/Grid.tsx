import React from "react";

import styles from "./grid.module.scss";

export const Grid: React.FC = (props) => {
  return <div className={styles.grid}>{props.children}</div>;
};
