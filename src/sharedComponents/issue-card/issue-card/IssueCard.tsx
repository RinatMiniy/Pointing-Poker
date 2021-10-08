import React, { ChangeEvent } from "react";
import { CardContainer } from "../../card-container/CardContainer";
import { IIssueCard, Priority } from "../../../types";
import { NewIssueCard } from "../new-issue-card/NewIssueCard";

import styles from "./issue-card.module.scss";
import { EditorSvg } from "../../../assets/editorSvg";

type IIssueCardProps = {
  onChange: (id: number, title: string, priority: Priority) => void;
  onConfirmUpdate: (title: string) => void;
  onDelete: (id: number) => void;
  onChangePriority: (id: number, title: string, priority: Priority) => void;
};

export const IssueCard: React.FC<IIssueCard & IIssueCardProps> = (props) => {
  const [isChanging, setIsChanging] = React.useState(false);
  const [title, setTitle] = React.useState(props.title);
  const [priority, setPriority] = React.useState(props.priority);

  const onChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    props.onChange(props.id, target.value, priority);
    setTitle(target.value);
  };

  const onConfirmUpdate = (title: string) => {
    props.onConfirmUpdate(title);
    if (title) {
      setIsChanging(false);
    }
  };

  const onChangePriority = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    setPriority(target.value as Priority);
    props.onChangePriority(props.id, title, target.value as Priority);
  };

  return (
    <CardContainer>
      {!isChanging ? (
        <div className={styles.issue}>
          <div>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.priority}>{props.priority} priority</div>
          </div>

          <EditorSvg onClick={() => setIsChanging(true)} />
          <svg
            onClick={() => props.onDelete(props.id)}
            viewBox="0 0 340.127 340.127"
          >
            <path d="M306.114,45.35l-68.025-0.295V36.62c0-20.226-18.548-36.62-41.45-36.62h-53.128c-22.902,0-41.473,16.394-41.473,36.62     v8.73l-68.025,0.045v45.396h23.355c-0.408,3.628-0.68,7.301-0.68,10.997v181.583c0,29.863,14.512,56.756,45.35,56.756h136.051     c30.838,0,45.35-26.893,45.35-56.756V101.789c0-3.719-0.159-7.392-0.454-10.997h23.129     C306.114,90.791,306.114,45.35,306.114,45.35z M124.713,36.62c0-7.551,8.617-13.923,18.798-13.923h53.128     c10.181,0,18.798,6.372,18.798,13.923v8.73h-90.701v-8.73H124.713z M260.764,283.349c0,17.415-4.308,34.058-22.675,34.058     H102.038c-18.344,0-22.675-16.644-22.675-34.058v-181.56c0-3.764,0.249-7.46,0.771-10.997h179.882     c0.499,3.537,0.771,7.233,0.771,10.997v181.56H260.764z M102.038,294.777h22.675V113.376h-22.675V294.777z M158.726,294.777     h22.675V113.376h-22.675V294.777z M215.414,294.777h22.675V113.376h-22.675V294.777z" />
          </svg>
        </div>
      ) : (
        <NewIssueCard
          type="update"
          priority={props.priority}
          value={props.title}
          onChange={onChange}
          onConfirmUpdate={onConfirmUpdate}
          onCancel={() => setIsChanging(false)}
          onChangePriority={onChangePriority}
        />
      )}
    </CardContainer>
  );
};
