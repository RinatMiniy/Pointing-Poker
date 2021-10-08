import React from "react";
import { GameCardContainer } from "../game-card-container/GameCardContainer";

import styles from "./new-game-card.module.scss";

type INewGameCardProps = {
  handleAddingCard: (value: string) => void;
};

export const NewGameCard: React.FC<INewGameCardProps> = (props) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleChangeInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleAddingCard = () => {
    props.handleAddingCard(value);
    if (value) {
      setInputVisible(false);
    }
  };
  return (
    <GameCardContainer>
      <div className={styles.newGameCard}>
        {!inputVisible && (
          <svg
            onClick={() => setInputVisible(true)}
            className={styles.plus}
            viewBox="0 0 313 313"
          >
            <path
              d="M171.875 78.125H140.625V140.625H78.125V171.875H140.625V234.375H171.875V171.875H234.375V140.625H171.875V78.125ZM156.25 0C70 0 0 70 0 156.25C0 242.5 70 312.5 156.25 312.5C242.5 312.5 312.5 242.5 312.5 156.25C312.5 70 242.5 0 156.25 0ZM156.25 281.25C87.3438 281.25 31.25 225.156 31.25 156.25C31.25 87.3438 87.3438 31.25 156.25 31.25C225.156 31.25 281.25 87.3438 281.25 156.25C281.25 225.156 225.156 281.25 156.25 281.25Z"
              fill="black"
              fillOpacity="0.43"
            />
          </svg>
        )}
        {inputVisible && (
          <>
            <label>
              <span>Value:</span>
              <input type="text" onChange={handleChangeInput} />
            </label>
            <div className={styles.controls}>
              <svg onClick={handleAddingCard} viewBox="0 0 305.002 305.002">
                <title>confirm</title>
                <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5    S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5    c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z" />
                <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678    l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385    c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z" />
              </svg>
              <svg onClick={() => setInputVisible(false)} viewBox="0 0 512 512">
                <title>cancel</title>
                <path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0" />
                <path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0" />
                <path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0" />
              </svg>
            </div>
          </>
        )}
      </div>
    </GameCardContainer>
  );
};
