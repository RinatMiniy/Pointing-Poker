import React from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { Button } from "../../sharedComponents/button/button";
import { GameCard } from "../../sharedComponents/game-card/GameCard";
import { H1 } from "../../sharedComponents/h1/H1";
import { IssueCard } from "../../sharedComponents/issue-card/issue-card/IssueCard";
import count from "../../utils/count";
import uniq from "../../utils/uniq";

import {
  selectIssues,
  selectSessionTitle,
  selectState,
} from "../redux/selectors";
import styles from "./gameResult.module.scss";

export const GameResult: React.FC = () => {
  const issues = useSelector(selectIssues);
  const sessionTitle = useSelector(selectSessionTitle);
  const state = useSelector(selectState);

  const issuesData = [];

  const onSave = (format: "csv" | "xlsx") => {
    const saveData = issuesData.map(function (el) {
      return [el[0], '"' + el[1] + '"'].join(",") + "\r\n";
    });
    saveAs(
      new Blob(saveData, { type: `text/${format}` }),
      `${sessionTitle}.${format}`
    );
  };

  return (
    <div className={styles.gameResult}>
      <H1 text={sessionTitle} />
      {issues.map((issue, idx) => {
        const cloneIssue = [...issue.cards];
        const votes = cloneIssue.map((el) => el.cardValue);
        const uniqVotes = uniq(votes);
        const issueData = [issue.title, votes.join(",")];
        console.log(issueData);
        issuesData.push(issueData);
        return (
          <>
            <IssueCard
              title={issue.title}
              link={issue.link}
              priority={issue.priority}
              id={idx}
              key={idx}
              isFinal={true}
              cards={issue.cards}
            />
            <div className={styles.cards}>
              {uniqVotes.map((el) => (
                <div key={el} className={styles.resultContainer}>
                  <GameCard
                    id={el}
                    key={el}
                    value={el}
                    sessionShortTitle={state.settings.scoreTypeShort}
                    cards={state.cards}
                  />
                  <div>
                    {Math.round((count(votes, el) / votes.length) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      })}
      <div className={styles.controls}>
        <Button
          text="save as .xlsx"
          isPrimary={true}
          onClick={() => onSave("xlsx")}
        />
        <Button
          text="save as .csv"
          isPrimary={true}
          onClick={() => onSave("csv")}
        />
      </div>
    </div>
  );
};
