import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGameTime } from "../redux/selectors";

import styles from "./time-field.module.scss";

type ITimerFieldProps = {
  min: number;
  sec: number;
  isLobby: boolean;
  onSetTimer?: (time: { min: number; sec: number }) => void;
  disabled?: boolean;
};

export const TimeField: React.FC<ITimerFieldProps> = (props) => {
  const [min, setMin] = useState(props.min);
  const [sec, setSec] = useState(props.sec);

  const time = useSelector(selectGameTime);

  useEffect(() => {
    if (props.onSetTimer) {
      props.onSetTimer({ min, sec });
    }
  }, [min, sec]);

  return (
    <div className={styles.timeField}>
      <label>
        <div>minutes</div>
        <input
          type="number"
          min="0"
          max="59"
          value={props.isLobby ? min : Math.floor(time / 60)}
          disabled={props.disabled}
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
          disabled={props.disabled}
          min="0"
          max="59"
          value={props.isLobby ? sec : String(time % 60).padStart(2, "0")}
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
