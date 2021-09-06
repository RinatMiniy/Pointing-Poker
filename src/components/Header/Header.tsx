import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.blue__line}></div>
      <div className={styles.aquamarine__line}></div>
      <img className={styles.logo} src="./logo.svg" alt="logo" />
    </header>
  );
};
