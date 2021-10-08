import React from "react";
import { socketIO } from "../../api/socket";
import { useSelector } from "react-redux";
import {
  selectSessionHash,
  selectUsers,
  selectChatOpen,
  selectChat,
  selectError,
} from "../redux/selectors";
import { requestMsgToChat } from "../redux/actions";
import { InputText } from "../../sharedComponents/inputText/InputText";
import { Button } from "../../sharedComponents/button/button";
import { useForm } from "react-hook-form";
import styles from "./chat.module.scss";
import { useNotify } from "../../hooks/useNotify";
import { PlayerCard } from "../player-card/PlayerCard";

type FormItem = {
  message: string;
};

export const Chat: React.FC = () => {
  const hash = useSelector(selectSessionHash);
  const chat = useSelector(selectChat);
  const chatOpen = useSelector(selectChatOpen);
  const users = useSelector(selectUsers);
  const activeUser = users.find((user) => user.socket === socketIO.id);
  const dealer = users.find((user) => user.role === "dealer");

  console.log(chat);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormItem>();

  const notify = useNotify();
  const error = useSelector(selectError);

  const onSubmit = (data: FormItem) => {
    console.log(data);

    requestMsgToChat(activeUser, data.message);

    error
      ? notify({ type: "error", message: error })
      : notify({ type: "success", message: "Succes" });

    reset();
  };

  React.useEffect(() => {
    register("message", {
      validate: (value) => !!value.length || "Message shoud be set!",
    });
  }, [register]);

  return (
    <>
      {hash && chatOpen && (
        <div className={styles.chat}>
          <div className={styles.chat__list}>
            {chat.map((item, index) => (
              <div key={index} className={styles.chat__item}>
                <div className={styles.chat__msg}>{item.message}</div>
                <PlayerCard
                  firstName={item.user.firstName}
                  lastName={item.user.lastName}
                  socket={item.user.socket}
                  avatar={item.user.avatar}
                  job={item.user.job}
                  role={item.user.role}
                  isMaster={item.user.socket === dealer.socket}
                />
              </div>
            ))}
          </div>
          <div className={styles.mainTitle}>
            <form
              className={styles.chat__form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputText
                field=""
                {...register("message")}
                error={errors.message?.message}
              />
              <Button text="Send" isPrimary={true} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
