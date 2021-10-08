import { IUser, IIssueCard, IGameSettings, IGame } from "../../types";

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
  error: string | null;
  loading: boolean;
  loaded: boolean;
  sessionExist: boolean;
  sessionConnectLoading: boolean;
  game: IGame;
};
