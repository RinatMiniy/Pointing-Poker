import React from "react";
import { Layout } from "../Layout/Layout";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./app.scss";

export const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Footer />
    </Layout>
  );
};
