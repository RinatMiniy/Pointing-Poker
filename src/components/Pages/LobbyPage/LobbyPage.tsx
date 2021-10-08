import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { selectAll, selectUsers } from "../../redux/selectors";
import { socketIO } from "../../../api/socket";
import { LobbyDealer } from "./LobbyDealer/LobbyDealer";
import { LobbyPlayer } from "./LobbyPlayer/LobbyPlayer";
import { Game } from "../../Game/Game";

export const LobbyPage: React.FC = () => {
  const users = useSelector(selectUsers);
  const all = useSelector(selectAll);

  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  return (
    <>
      {!all.game.runGame ? (
        isDelear ? (
          <LobbyDealer />
        ) : (
          <LobbyPlayer />
        )
      ) : (
        <Game />
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
