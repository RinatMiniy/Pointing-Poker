import React from "react";
import { useForm } from "react-hook-form";
import { H1 } from "../../h1/H1";
import { PopupOverlay } from "../../popup-overlay/PopupOverlay";
import { InputText } from "../../inputText/InputText";
import { IIssueCard, Priority } from "../../../types";
import { Button } from "../../button/button";

import styles from "./new-issue-popup.module.scss";

type INewIssuePopup = {
  type: "update" | "create";
  handleCreateIssue?: (issue: IIssueCard) => void;
  handleUpdateIssue?: (issue: IIssueCard) => void;
  onCancel: () => void;
  title?: string;
  link?: string;
  priority?: Priority;
};

export const NewIssuePopup: React.FC<INewIssuePopup> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IIssueCard>({
    defaultValues: {
      title: props.title,
      link: props.link,
      priority: props.priority || Priority.low,
    },
  });

  const onSubmit = (data) => {
    reset();
    props.type === "create"
      ? props.handleCreateIssue(data)
      : props.handleUpdateIssue(data);
  };

  React.useEffect(() => {
    register("title", {
      validate: (value) => !!value.length || "Title shoud be set!",
    });
    register("link", {
      validate: (value) => !!value.startsWith("http") || "Set correct link!",
    });
  }, [register]);

  return (
    <>
      <PopupOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.newIssuePopup}>
          <H1 text="Create issue" />
          <div className={styles.item}>
            <InputText
              field="Title:"
              name="title"
              isSmall={true}
              {...register("title")}
              error={errors.title?.message}
            />
          </div>
          <div className={styles.item}>
            <InputText
              field="Link:"
              name="link"
              isSmall={true}
              {...register("link")}
              error={errors.link?.message}
            />
          </div>
          <div className={styles.item}>
            <span>Priority:</span>
            <select {...register("priority")}>
              {Object.keys(Priority).map((key) => (
                <option key={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className={styles.controls}>
            <Button text={props.type} isPrimary={true} />
            <Button text="cancel" onClick={props.onCancel} />
          </div>
        </div>
      </form>
    </>
  );
};
