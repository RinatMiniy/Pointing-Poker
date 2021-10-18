import React from "react";

import styles from "./game-card-container.module.scss";

export const GameCardContainer: React.FC = (props) => {
  return <div className={styles.gameCardContainer}>{props.children}</div>;
};
