import React from "react";
import { CardContainer } from "../../card-container/CardContainer";

import styles from "./create-issue.module.scss";

type ICreateNewIssueProps = {
  onClick: () => void;
};

export const CreateIssue: React.FC<ICreateNewIssueProps> = (props) => {
  return (
    <CardContainer>
      <div className={styles.title}>Create new issue</div>
      <svg
        className={styles.plus}
        onClick={props.onClick}
        viewBox="0 0 512 512"
      >
        <polygon points="276,236 276,0 236,0 236,236 0,236 0,276 236,276 236,512 276,512 276,276 512,276 512,236   " />
      </svg>
    </CardContainer>
  );
};
