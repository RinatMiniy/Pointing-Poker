import React from "react";
import cn from "classnames";

import styles from "./button.module.scss";

type IButtonProps = {
  text: string;
  onClick?: () => void;
  isPrimary?: boolean;
  isLong?: boolean;
};

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button
      className={cn(styles.button, {
        [styles["button--primary"]]: props.isPrimary,
        [styles["button--long"]]: props.isLong,
      })}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
