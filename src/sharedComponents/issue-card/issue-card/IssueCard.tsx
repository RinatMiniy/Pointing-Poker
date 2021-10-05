import React, { ChangeEvent } from "react";
import { CardContainer } from "../../card-container/CardContainer";
import { IIssueCard, Priority } from "../../../types";
import { NewIssueCard } from "../new-issue-card/NewIssueCard";

import styles from "./issue-card.module.scss";

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

          <svg onClick={() => setIsChanging(true)} viewBox="0 0 128 128">
            <path
              d="M36.108,110.473l70.436-70.436L87.963,21.457L17.526,91.893c-0.378,0.302-0.671,0.716-0.803,1.22   l-5.476,20.803c-0.01,0.04-0.01,0.082-0.019,0.121c-0.018,0.082-0.029,0.162-0.039,0.247c-0.007,0.075-0.009,0.147-0.009,0.222   c-0.001,0.077,0.001,0.147,0.009,0.225c0.01,0.084,0.021,0.166,0.039,0.246c0.008,0.04,0.008,0.082,0.019,0.121   c0.007,0.029,0.021,0.055,0.031,0.083c0.023,0.078,0.053,0.154,0.086,0.23c0.029,0.067,0.057,0.134,0.09,0.196   c0.037,0.066,0.077,0.127,0.121,0.189c0.041,0.063,0.083,0.126,0.13,0.184c0.047,0.059,0.1,0.109,0.152,0.162   c0.053,0.054,0.105,0.105,0.163,0.152c0.056,0.048,0.119,0.09,0.182,0.131c0.063,0.043,0.124,0.084,0.192,0.12   c0.062,0.033,0.128,0.062,0.195,0.09c0.076,0.033,0.151,0.063,0.23,0.087c0.028,0.009,0.054,0.023,0.083,0.031   c0.04,0.01,0.081,0.01,0.121,0.02c0.081,0.017,0.162,0.028,0.246,0.037c0.077,0.009,0.148,0.011,0.224,0.01   c0.075,0,0.147-0.001,0.223-0.008c0.084-0.011,0.166-0.022,0.247-0.039c0.04-0.01,0.082-0.01,0.121-0.02l20.804-5.475   C35.393,111.146,35.808,110.853,36.108,110.473z M19.651,108.349c-0.535-0.535-1.267-0.746-1.964-0.649l3.183-12.094l11.526,11.525   L20.3,110.313C20.398,109.616,20.188,108.884,19.651,108.349z"
              fill="#2F3435"
            />
            <path
              d="M109.702,36.879l-18.58-18.581l7.117-7.117c0,0,12.656,4.514,18.58,18.582L109.702,36.879z"
              fill="#2F3435"
            />
          </svg>
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
