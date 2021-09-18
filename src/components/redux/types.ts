import { IUser, IIssueCard, IGameSettings } from "../../types";

export type IResponse = {
  title: string;
  hash: string;
  users: IUser[];
  issues: IIssueCard[];
  settings: IGameSettings;
};

export type IStore = {
  title: string;
  hash: string;
  users: IUser[];
  issues: IIssueCard[];
  settings: IGameSettings;
  activeUser: IUser | null;
  error: string | null;
  loading: boolean;
  loaded: boolean;
};
