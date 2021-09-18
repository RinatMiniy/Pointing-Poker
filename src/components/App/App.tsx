import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { RouterApp } from "../router";
// import { LobbyPage } from "../Pages/LobbyPage/LobbyPage";
import store from "../store";

import "./app.scss";
// import { RegisterForm } from "../registerForm/RegisterForm";

export const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Header />
          <RouterApp />
          <Footer />
        </Layout>
      </Provider>
    </Router>
  );
};
