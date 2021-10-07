import { IUser, IIssueCard, IGameSettings } from "../../types";

export type IResponse = {
  title: string;
  hash: string;
  users: IUser[];
  issues: IIssueCard[];
  settings: IGameSettings;
  cards: string[];
  roundTime: number;
  autoLogin: boolean;
  flipCards: boolean;
  game: IGame;
};

export type IGame = {
  runGame: boolean;
  endGame: boolean;
  runRound: boolean;
  endRound: boolean;
  time: 0;
  issue: 0;
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
  game: IGame;
};
