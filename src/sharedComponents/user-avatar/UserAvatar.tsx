import React from "react";
import cn from "classnames";

import styles from "./user-avatar.module.scss";

type IUserAvatar = {
  firstName: string;
  lastName: string;
  img?: string;
  isMiddleSize: boolean;
};

export const UserAvatar: React.FC<IUserAvatar> = (props) => {
  return (
    <div
      className={cn(styles.userAvatarContainer, {
        [styles["userAvatarContainer--middleSize"]]: props.isMiddleSize,
      })}
    >
      {props.img ? (
        <img src={props.img} alt="avatar" />
      ) : (
        <div className={styles.innerText}>
          {props.firstName[0]}
          {props.lastName[0]}
        </div>
      )}
    </div>
  );
};
