import React, { ChangeEvent } from "react";
import { Grid } from "../../sharedComponents/grid/Grid";
import { IssueCard } from "../../sharedComponents/issue-card/issue-card/IssueCard";
import { CreateIssue } from "../../sharedComponents/issue-card/create-issue/CreateIssue";
import { IIssueCard, Priority } from "../../types";
import { NewIssueCard } from "../../sharedComponents/issue-card/new-issue-card/NewIssueCard";

type IIssuesProps = {
  issues: IIssueCard[];
  onDelete: (id: number) => void;
  onChange: (id: number, title: string) => void;
  onConfirmUpdate: (title: string) => void;
  onChangePriority: (id: number, priority: Priority) => void;
  // onCreateIssue?: (e: ChangeEvent) => void;
  // onSetPriotity?: (e: ChangeEvent) => void;
  onConfirmCreate: (title: string, pririty: Priority) => void;
};

export const Issues: React.FC<IIssuesProps> = (props) => {
  const [isCreateIssue, setIsCreateIssue] = React.useState(false);
  const [newIssueTitle, setNewIssueTitle] = React.useState("");
  const [newIssuePriority, setNewIssuePriority] = React.useState(Priority.low);

  const onCreateIssueTitle = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setNewIssueTitle(target.value);
  };

  const onConfirmCreate = () => {
    props.onConfirmCreate(newIssueTitle, newIssuePriority);
    if (newIssueTitle) {
      setIsCreateIssue(false);
    }
  };

  const onSetPriority = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    setNewIssuePriority(target.value as Priority);
  };

  return (
    <Grid>
      {props.issues.map((issue) => (
        <IssueCard
          key={issue.id}
          id={issue.id}
          title={issue.title}
          priority={issue.priority}
          onChange={props.onChange}
          onConfirmUpdate={props.onConfirmUpdate}
          onDelete={props.onDelete}
          onChangePriority={props.onChangePriority}
        />
      ))}
      {isCreateIssue ? (
        <NewIssueCard
          type="create"
          priority={newIssuePriority}
          onChange={onCreateIssueTitle}
          onCancel={() => setIsCreateIssue(false)}
          onChangePriority={onSetPriority}
          onConfirmCreate={onConfirmCreate}
        />
      ) : (
        <CreateIssue onClick={() => setIsCreateIssue(true)} />
      )}
    </Grid>
  );
};
