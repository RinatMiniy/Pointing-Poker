import React from "react";
import { Switch, Route } from "react-router-dom";
import { RegisterForm } from "./registerForm/RegisterForm";
import { LobbyPage } from "./Pages/LobbyPage/LobbyPage";

export const RouterApp: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <RegisterForm />
      </Route>
      <Route exact path="/lobby">
        <LobbyPage />
      </Route>
    </Switch>
  );
};
