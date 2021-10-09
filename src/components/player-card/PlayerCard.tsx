import React from "react";
import { UserAvatar } from "../../sharedComponents/user-avatar/UserAvatar";
import { IUser } from "../../types";
import { CardContainer } from "../../sharedComponents/card-container/CardContainer";

import styles from "./player-card.module.scss";
import { socketIO } from "../../api/socket";
import { selectVoting } from "../redux/selectors";
import { useSelector } from "react-redux";

type IPlayerCard = {
  isMaster: boolean;
  onDelete?: (socket: string) => void;
};

export const PlayerCard: React.FC<IUser & IPlayerCard> = (props) => {
  const voting = useSelector(selectVoting);
  const isActive = props.socket === socketIO.id;

  return (
    <CardContainer>
      <UserAvatar
        isMiddleSize={true}
        firstName={props.firstName}
        lastName={props.lastName}
      />
      <div className={styles.userInformation}>
        {isActive && <div className={styles.active}>It&apos;s you</div>}
        <div className={styles.useFaq}>
          {props.firstName} {props.lastName}
        </div>
        {props.job && <div className={styles.job}>{props.job}</div>}
      </div>
      {props.role !== "dealer" && props.isMaster && (
        <svg
          className={styles.delete}
          onClick={() => props.onDelete(props.socket)}
          viewBox="0 0 512 512"
        >
          <path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0" />
          <path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0" />
          <path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0" />
        </svg>
      )}
      {props.onDelete &&
        props.role !== "dealer" &&
        !props.isMaster &&
        !isActive &&
        !voting.run && (
          <svg
            className={styles.delete}
            onClick={() => props.onDelete(props.socket)}
            viewBox="0 0 512 512"
          >
            <path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0" />
            <path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0" />
            <path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0" />
          </svg>
        )}
    </CardContainer>
  );
};
