import React from "react";
import { IUser } from "../../types";
import { PlayerCard } from "../../components/player-card/PlayerCard";
import { Grid } from "../grid/Grid";

type IMembers = {
  members: IUser[];
  onDelete: (id: number) => void;
};

export const Members: React.FC<IMembers> = (props) => {
  return (
    <Grid>
      {props.members.map((member) => (
        <PlayerCard
          key={member.id}
          id={member.id}
          firstName={member.firstName}
          lastName={member.lastName}
          isActive={member.isActive}
          img={member.img}
          job={member.job}
          userRole={member.userRole}
          onDelete={props.onDelete}
        />
      ))}
    </Grid>
  );
};
