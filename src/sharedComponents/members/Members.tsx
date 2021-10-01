import React from "react";
import { IUser } from "../../types";
import { PlayerCard } from "../../components/player-card/PlayerCard";
import { Grid } from "../grid/Grid";
import { socketIO } from "../../api/socket";

type IMembers = {
  members: IUser[];
  onDelete: (socket: string) => void;
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
          isActive={member.socket === socketIO.id}
          img=""
          job=""
          role={member.role}
          onDelete={props.onDelete}
        />
      ))}
    </Grid>
  );
};
