import { IUser, IIssueCard, IGameSettings } from "../../types";

export type IResponse = {
  title: string;
  hash: string;
  users: IUser[];
  issues: IIssueCard[];
  settings: IGameSettings;
  cards: string[];
};

export type IStore = {
  title: string;
  hash: string;
  users: IUser[];
  issues: IIssueCard[];
  settings: IGameSettings;
  cards: string[];
  error: string | null;
  loading: boolean;
  loaded: boolean;
  sessionExist: boolean;
  sessionConnectLoading: boolean;
};
