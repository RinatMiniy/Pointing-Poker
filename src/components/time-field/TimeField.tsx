import React from "react";

import styles from "./time-field.module.scss";

type ITimerFieldProps = {
  min: number;
  sec: number;
  onSetMinutes: (e: React.ChangeEvent) => void;
  onSetSeconds: (e: React.ChangeEvent) => void;
};

export const TimeField: React.FC<ITimerFieldProps> = (props) => {
  return (
    <div className={styles.timeField}>
      <label>
        <div>minutes</div>
        <input type="text" value={props.min} onChange={props.onSetMinutes} />
      </label>
      <div>:</div>
      <label>
        <div>seconds</div>
        <input type="text" value={props.sec} onChange={props.onSetSeconds} />
      </label>
    </div>
  );
};
