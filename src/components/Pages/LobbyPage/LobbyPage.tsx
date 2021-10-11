import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { selectState, selectUsers } from "../../redux/selectors";
import { socketIO } from "../../../api/socket";
import { LobbyDealer } from "./LobbyDealer/LobbyDealer";
import { LobbyPlayer } from "./LobbyPlayer/LobbyPlayer";
import { Game } from "../../Game/Game";
import { GameResult } from "../../GameResult/GameResult";
import { Redirect, useParams } from "react-router-dom";

interface IRouteParams {
  id: string;
}

export const LobbyPage: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const users = useSelector(selectUsers);
  const state = useSelector(selectState);

  if (id && !users.length) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { hash: id },
        }}
      />
    );
  }

  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  return (
    <>
      {!state.game.endGame ? (
        !state.game.runGame ? (
          isDelear ? (
            <LobbyDealer />
          ) : (
            <LobbyPlayer />
          )
        ) : (
          <Game />
        )
      ) : (
        <GameResult />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    </>
  );
};
