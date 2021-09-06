import "./header.module.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="blue__line"></div>
      <div className="aquamarine__line"></div>
      <img className="logo" src="./logo.svg" alt="logo" />
    </header>
  );
};
