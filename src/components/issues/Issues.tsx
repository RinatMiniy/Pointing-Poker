import React from "react";
import { Grid } from "../../sharedComponents/grid/Grid";
import { IssueCard } from "../../sharedComponents/issue-card/issue-card/IssueCard";
import { CreateIssue } from "../../sharedComponents/issue-card/create-issue/CreateIssue";
import { IIssueCard } from "../../types";
import { useSelector } from "react-redux";
import { selectUsers } from "../redux/selectors";
import { socketIO } from "../../api/socket";
import { NewIssuePopup } from "../../sharedComponents/issue-card/new-issue-popup/NewIssuePopup";

type IIssuesProps = {
  issues: IIssueCard[];
  handleCreateIssue: (issue: IIssueCard) => void;
  handleUpdateIssue: (id: number, issue: IIssueCard) => void;
  onDelete: (id: number) => void;
};

export const Issues: React.FC<IIssuesProps> = (props) => {
  const [isCreateIssue, setIsCreateIssue] = React.useState(false);
  const [isUpdateIssue, setIsUpdateIssue] = React.useState(false);
  const [updatedCard, setUpdatedCard] = React.useState<IIssueCard | null>(null);
  const [idUpatedIssue, setIdUpdatedIssue] = React.useState<null | number>(
    null
  );

  const users = useSelector(selectUsers);
  const dealer = users.find((user) => user.role === "dealer");
  const isDelear = dealer.socket === socketIO.id;

  const handleCreateIssue = (issue: IIssueCard) => {
    props.handleCreateIssue(issue);
    setIsCreateIssue(false);
  };

  const handleUpdateIssue = (issue: IIssueCard) => {
    props.handleUpdateIssue(idUpatedIssue, issue);
    setIsUpdateIssue(false);
  };

  const onUpdate = (id: number, issue: IIssueCard) => {
    setIsUpdateIssue(true);
    setUpdatedCard(issue);
    setIdUpdatedIssue(id);
  };

  return (
    <Grid>
      {props.issues.map((issue, idx) => (
        <IssueCard
          id={idx}
          key={issue.title}
          link={issue.link}
          title={issue.title}
          priority={issue.priority}
          onDelete={props.onDelete}
          cards={issue.cards}
          onUpdate={onUpdate}
        />
      ))}
      {isDelear &&
        (isCreateIssue ? (
          <NewIssuePopup
            handleCreateIssue={handleCreateIssue}
            onCancel={() => setIsCreateIssue(false)}
            type="create"
          />
        ) : (
          <CreateIssue onClick={() => setIsCreateIssue(true)} />
        ))}
      {isUpdateIssue && (
        <NewIssuePopup
          handleUpdateIssue={handleUpdateIssue}
          onCancel={() => setIsUpdateIssue(false)}
          type="update"
          title={updatedCard.title}
          priority={updatedCard.priority}
          link={updatedCard.link}
        />
      )}
    </Grid>
  );
};
