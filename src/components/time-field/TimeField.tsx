import React, { useEffect, useState } from "react";

import styles from "./time-field.module.scss";

type ITimerFieldProps = {
  min: number;
  sec: number;
  onSetTimer: (time: { min: number; sec: number }) => void;
};

export const TimeField: React.FC<ITimerFieldProps> = (props) => {
  const [min, setMin] = useState(props.min);
  const [sec, setSec] = useState(props.sec);

  useEffect(() => {
    props.onSetTimer({ min, sec });
  }, [min, sec]);

  return (
    <div className={styles.timeField}>
      <label>
        <div>minutes</div>
        <input
          type="number"
          min="0"
          max="59"
          value={min}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 59) value = 59;
            setMin(Number(value));
          }}
        />
      </label>
      <div>:</div>
      <label>
        <div>seconds</div>
        <input
          type="number"
          min="0"
          max="59"
          value={sec}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 59) value = 59;
            setSec(Number(value));
          }}
        />
      </label>
    </div>
  );
};
