import React from "react";
import cn from "classnames";
import { EditorSvg } from "../../assets/editorSvg";
import { useNotify } from "../../hooks/useNotify";
import { requestUpdate } from "../../components/redux/actions";
import { GameCardContainer } from "../game-card-container/GameCardContainer";

import styles from "./game-card.module.scss";
import { Settings } from "../../types";

type IGameCardProps = {
  id: number;
  value: string;
  sessionShortTitle: string;
  cards: string[];
  onClick?: () => void;
};

export const GameCard: React.FC<IGameCardProps> = (props) => {
  const [value, setValue] = React.useState(props.value);
  const [inputVisible, setInputVisible] = React.useState(false);

  const notify = useNotify();

  const onChangeValue = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleEdit = () => {
    setInputVisible(true);
  };

  const handleSubmitEdit = () => {
    if (!value) {
      notify({ type: "error", message: "Value should be set!" });
      setInputVisible(false);
    } else if (props.cards.includes(value) && value !== props.value) {
      notify({ type: "error", message: "This value already exists!" });
    } else {
      requestUpdate(
        Settings.cards,
        props.cards.map((card, idx) => (idx === props.id ? value : card))
      );
      notify({ type: "success", message: "Updated!" });
      setInputVisible(false);
    }
  };

  const isUnknown = !Number.isFinite(+value) && !parseInt(value);

  return (
    <GameCardContainer>
      <div onClick={() => props.onClick()} role="presentation">
        {!inputVisible && (
          <div className={styles.upperTitle}>
            <div
              className={cn(styles.value, {
                [styles.valueText]: isUnknown,
              })}
            >
              {value}
            </div>
            <EditorSvg onClick={handleEdit} />
          </div>
        )}
        {inputVisible && (
          <div className={styles.upperTitle}>
            <input type="text" value={value} onChange={onChangeValue} />
            <svg
              onClick={handleSubmitEdit}
              viewBox="0 0 1280.000000 1218.000000"
            >
              <g
                transform="translate(0.000000,1218.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path d="M12067 12170 c-134 -24 -279 -85 -373 -156 -96 -73 -1311 -1209 -4004 -3744 -2070 -1948 -2578 -2425 -3325 -3119 -280 -261 -566 -530 -634 -598 -69 -68 -135 -126 -148 -129 -17 -5 -68 14 -176 64 -84 39 -299 134 -479 211 -181 78 -473 204 -650 280 -2117 912 -1964 850 -2071 830 -82 -15 -142 -58 -177 -127 -54 -104 -29 -218 85 -392 52 -78 288 -491 685 -1195 938 -1665 1286 -2269 1718 -2980 250 -412 478 -784 508 -826 66 -94 184 -208 247 -237 62 -29 151 -52 202 -52 99 0 221 51 307 129 64 57 108 120 271 386 183 300 339 543 536 840 1598 2396 3567 4881 7583 9567 295 345 548 645 562 667 14 22 35 68 47 103 67 198 -77 388 -348 459 -88 23 -288 34 -366 19z" />
              </g>
            </svg>
          </div>
        )}
        <div className={styles.gameName}>
          {isUnknown ? (
            <svg viewBox="0 0 322 322">
              <path
                d="M0 286H286V321.75H0V286ZM286 0H0V178.75C0 218.254 31.9963 250.25 71.5 250.25H178.75C218.254 250.25 250.25 218.254 250.25 178.75V125.125H286C305.841 125.125 321.75 109.037 321.75 89.375V35.75C321.75 15.9087 305.841 0 286 0ZM214.5 178.75C214.5 198.413 198.413 214.5 178.75 214.5H71.5C51.8375 214.5 35.75 198.413 35.75 178.75V35.75H214.5V178.75ZM286 89.375H250.25V35.75H286V89.375Z"
                fill="black"
              />
            </svg>
          ) : (
            props.sessionShortTitle
          )}
        </div>
        <div className={styles.lowTitle}>
          <div
            className={cn(styles.value, {
              [styles.valueText]: isUnknown,
            })}
          >
            {value}
          </div>
        </div>
      </div>
    </GameCardContainer>
  );
};
