import React from "react";
import cn from "classnames";
import { IUser } from "../../types";

import styles from "./user-avatar.module.scss";

type IUserAvatar = {
  user: IUser;
  isMiddleSize: boolean;
};

export const UserAvatar: React.FC<IUserAvatar> = (props) => {
  return (
    <div
      className={cn(styles.userAvatarContainer, {
        [styles["userAvatarContainer--middleSize"]]: props.isMiddleSize,
      })}
    >
      {props.user.img ? (
        <img src={props.user.img} alt="avatar" />
      ) : (
        <div className={styles.innerText}>
          {props.user.firstName[0]}
          {props.user.lastName[0]}
        </div>
      )}
    </div>
  );
};
