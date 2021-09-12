export type Role = "admin" | "observer" | "player";

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  img?: string;
  job?: string;
  isActive: boolean;
  userRole: Role;
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
  scramIsPlayer: boolean;
  changeCardInEnd: boolean;
  isTimerNeed: boolean;
  scoreType: string;
  scoreTypeShort: string;
  time: {
    min: number;
    sec: number;
  };
};
