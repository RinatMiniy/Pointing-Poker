export type Role = "dealer" | "observer" | "player";

export type IUser = {
  firstName: string;
  lastName: string;
  role: string;
  socket: string;
  job?: string;
  avatar?: string;
};

export type IUserComplete = {
  firstName: string;
  lastName: string;
  userRole: string;
  socket: string;
  isActive: boolean;
  job?: string;
  avatar?: string;
};

export type IUserRequest = {
  firstName: string;
  lastName: string;
  observer: boolean;
  avatar?: string;
  job?: string;
  role: string;
};

export type ILoginRequest = {
  firstName: string;
  lastName: string;
  observer: boolean;
  avatar?: string;
  job?: string;
  hash: string;
};

export enum Priority {
  low = "low",
  middle = "middle",
  high = "high",
}

export type ICards = {
  userSocket: string;
  cardValue: string;
};
export enum Settings {
  title = "title",
  hash = "hash",
  users = "users",
  issues = "issues",
  settings = "settings",
  cards = "cards",
  game = "game",
}

export type IIssueCards = {
  userSocket: string;
  cardValue: string;
};

export type IIssueCard = {
  title: string;
  link: string;
  priority: Priority;
  cards: IIssueCards[];
};

export enum SetCards {
  fibonacci = "fibonacci",
  degreesTwo = "degreesTwo",
  custom = "custom",
}

export type IGameSettings = {
  changingCard: boolean;
  masterPlayer: boolean;
  roundTime: number;
  scoreType: string;
  scoreTypeShort: string;
  timer: boolean;
  autoLogin: boolean;
  flipCards: boolean;
  setCards: SetCards;
};

export type IGame = {
  runGame: boolean;
  endGame: boolean;
  runRound: boolean;
  endRound: boolean;
  time: number;
  issue: number;
};
