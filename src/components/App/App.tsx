import React from "react";
import { Layout } from "../Layout/Layout";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { LobbyPage } from "../Pages/LobbyPage/LobbyPage";

import "./app.scss";
import { RegisterForm } from "../registerForm/RegisterForm";

export const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <RegisterForm />
      <Footer />
    </Layout>
  );
};
