import React from "react";
import cn from "classnames";

import styles from "./card-container.module.scss";

type ICardContainer = {
  isActive?: boolean;
};

export const CardContainer: React.FC<ICardContainer> = (props) => {
  return (
    <div
      className={cn(styles.cardContainer, {
        [styles.isActive]: props.isActive,
      })}
    >
      {props.children}
    </div>
  );
};
