import React from "react";
import { IUser } from "../../types";
import { PlayerCard } from "../../components/player-card/PlayerCard";
import { Grid } from "../grid/Grid";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../components/redux/selectors";

type IMembers = {
  members: IUser[];
  onDelete: (socket: string) => void;
};

export const Members: React.FC<IMembers> = (props) => {
  const activeUser = useSelector(selectActiveUser);
  return (
    <Grid>
      {props.members.map((member) => (
        <PlayerCard
          key={member.socket}
          firstName={member.firstName}
          lastName={member.lastName}
          socket={member.socket}
          isActive={member.socket === activeUser.socket}
          avatar={member.avatar}
          job=""
          userRole=""
          onDelete={props.onDelete}
        />
      ))}
    </Grid>
  );
};
