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
  img?: string;
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
  img?: string;
  job?: string;
  hash: string;
};

export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

export type ICards = {
  userId: string;
  cardValue: string;
};

export type IIssueCard = {
  id: number;
  title: string;
  priority: Priority;
  cards?: ICards[];
};

export type IGameSettings = {
  changingCard: boolean;
  masterPlayer: boolean;
  roundTime: number;
  scoreType: string;
  scoreTypeShort: string;
  timer: boolean;
};

export type IGame = {
  runGame: boolean;
  endGame: boolean;
  runRound: boolean;
  endRound: boolean;
  time: number;
  issue: number;
};
