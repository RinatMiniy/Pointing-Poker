import React from "react";
import { IUser } from "../../types";
import { PlayerCard } from "../../components/player-card/PlayerCard";
import { Grid } from "../grid/Grid";

type IMembers = {
  isMaster: boolean;
  members: IUser[];
  onDelete?: (socket: string) => void;
};

export const Members: React.FC<IMembers> = (props) => {
  return (
    <Grid>
      {props.members.map((member) => (
        <PlayerCard
          key={member.socket}
          firstName={member.firstName}
          lastName={member.lastName}
          socket={member.socket}
          avatar={member.avatar}
          job={member.job}
          role={member.role}
          onDelete={props.onDelete}
          isMaster={props.isMaster}
        />
      ))}
    </Grid>
  );
};
