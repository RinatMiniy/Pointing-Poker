import React from "react";

import styles from "./card-container.module.scss";

export const CardContainer: React.FC = (props) => {
  return <div className={styles.cardContainer}>{props.children}</div>;
};
