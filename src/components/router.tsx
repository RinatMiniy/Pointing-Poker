import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage } from "./Pages/MainPage/MainPage";
import { LobbyPage } from "./Pages/LobbyPage/LobbyPage";

export const RouterApp: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/:id">
        <LobbyPage />
      </Route>
    </Switch>
  );
};
