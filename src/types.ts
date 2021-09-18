export type Role = "dealer" | "observer" | "player";

export type IUser = {
  firstName: string;
  lastName: string;
  userRole: string;
  socket: string;
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
  position: string;
  observer: boolean;
};

export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

export type IIssueCard = {
  id: number;
  title: string;
  priority: Priority;
};

export type IGameSettings = {
  changingCard: boolean;
  masterPlayer: boolean;
  roundTime: string;
  scoreType: string;
  scoreTypeShort: string;
  timer: boolean;
};
