import { useSelector } from "react-redux";
import { CardContainer } from "../../sharedComponents/card-container/CardContainer";

import { selectIssues } from "../redux/selectors";
import styles from "./gameResult.module.scss";

export const GameResult = () => {
  const issues = useSelector(selectIssues);
  // const state = useSelector(selectState)

  return (
    <div className={styles.gameResult}>
      {issues.map((issue, index) => (
        <div className={styles.roundStat} key={index}>
          {console.log("issue", issue)}
          <CardContainer>
            <div className={styles.issue}>
              <div>
                {console.log(index)}
                <div className={styles.title}>{issue.title}</div>
                <div className={styles.priority}>{issue.priority} priority</div>
              </div>
            </div>
            <div className={styles.statisticBlock}>
              {issue.cards.map((cards) => {
                cards.cardValue;
              })}
              {/* {state.game.endRound && 
              <div>{Object.keys(statistic[0]).map((key) => (
                <li key={key}>
                  {key} - {statistic[0][key]}
                </li>))}
              </div>
            } */}
            </div>
          </CardContainer>
        </div>
      ))}
    </div>
  );
};
