import { IIssueCard, IUser, IUserRequest } from "../../types";
import { socket } from "../../api/socket";
import { Dispatch } from "redux";
import { IResponse } from "./types";

export const GET_SESSION = "GET_SESSION";
export const GET_SESSION_ERROR = "GET_SESSION_ERROR";
export const LOADING_SESSION = "LOADING_SESSION";
export const LOADED_SESSION = "LOADED_SESSION";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const CREATE_ISSUE = "CREATE_ISSUE";
export const UPDATE_ISSUE = "UPDATE_ISSUE";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const MASTER_PLAYER = "MASTER_PLAYER";
export const CHANGING_CARD = "CHANGING_CARD";
export const TIMER = "TIMER";
export const SCORE_TYPE = "SCORE_TYPE";
export const SCORE_TYPE_SHORT = "SCORE_TYPE_SHORT";
export const ROUND_TIME = "ROUND_TIME";
export const DELETE_MEMBER = "DELETE_MEMBER";
export const GET_USERS = "GET_USERS";

export const SESSION_EXIST = "SESSION_EXIST";
export const SESSION_CONNECT_LOADING = "SESSION_CONNECT_LOADING";
export const REQUEST_ENTER = "ALLOW_ENTER";

export type IGetSessionError = {
  type: typeof GET_SESSION_ERROR;
  payload: {
    error: string | null;
  };
};

export type IGetSession = {
  type: typeof GET_SESSION;
  payload: {
    session: IResponse;
  };
};

export type ILoadingSession = {
  type: typeof LOADING_SESSION;
  payload: {
    loading: boolean;
  };
};

export type ILoadedSession = {
  type: typeof LOADED_SESSION;
  payload: {
    loaded: boolean;
  };
};

export type IUpdateTitle = {
  type: typeof UPDATE_TITLE;
  payload: {
    title: string;
  };
};

export type ICreateIssue = {
  type: typeof CREATE_ISSUE;
  payload: {
    issue: IIssueCard;
  };
};

export type IUpdateIssue = {
  type: typeof UPDATE_ISSUE;
  payload: {
    issue: IIssueCard;
  };
};

export type IDeleteIssue = {
  type: typeof DELETE_ISSUE;
  payload: {
    id: number;
  };
};

export type IMasterPlayer = {
  type: typeof MASTER_PLAYER;
  payload: {
    masterPlayer: boolean;
  };
};

export type IChangingCard = {
  type: typeof CHANGING_CARD;
  payload: {
    changingCard: boolean;
  };
};

export type ITimer = {
  type: typeof TIMER;
  payload: {
    timer: boolean;
  };
};

export type IScoreType = {
  type: typeof SCORE_TYPE;
  payload: {
    scoreType: string;
  };
};

export type IScoreTypeShort = {
  type: typeof SCORE_TYPE_SHORT;
  payload: {
    scoreTypeShort: string;
  };
};

export type IRoundTime = {
  type: typeof ROUND_TIME;
  payload: {
    roundTime: number;
  };
};

export type ISessionConnect = {
  type: typeof SESSION_EXIST;
  payload: {
    sessionExist: boolean;
  };
};

export type ISessionConnectLoading = {
  type: typeof SESSION_CONNECT_LOADING;
  payload: {
    sessionConnectLoading: boolean;
  };
};

export type IRequestEnter = {
  type: typeof REQUEST_ENTER;
  payload: {
    requestEnter: boolean;
  };
};

export type IDeleteMember = {
  type: typeof DELETE_MEMBER;
  payload: {
    socketId: string;
  };
};

export type IGetUsers = {
  type: typeof GET_USERS;
  payload: {
    users: IUser[];
  };
};

export type IUnion =
  | IGetSession
  | IUpdateTitle
  | IGetSessionError
  | ILoadingSession
  | ILoadedSession
  | ICreateIssue
  | IUpdateIssue
  | IDeleteIssue
  | IMasterPlayer
  | IChangingCard
  | ITimer
  | IScoreType
  | IScoreTypeShort
  | IRoundTime
  | ISessionConnect
  | ISessionConnectLoading
  | IRequestEnter
  | IDeleteMember
  | IGetUsers;

export const getSession = (session: IResponse): IGetSession => ({
  type: GET_SESSION,
  payload: {
    session,
  },
});

export const getSessionError = (error: string | null): IGetSessionError => ({
  type: GET_SESSION_ERROR,
  payload: {
    error,
  },
});

export const loadingSession = (loading: boolean): ILoadingSession => ({
  type: LOADING_SESSION,
  payload: {
    loading,
  },
});

export const loadedSession = (loaded: boolean): ILoadedSession => ({
  type: LOADED_SESSION,
  payload: {
    loaded,
  },
});

export const updateTitle = (title: string): IUpdateTitle => ({
  type: UPDATE_TITLE,
  payload: {
    title,
  },
});

export const createIssue = (issue: IIssueCard): ICreateIssue => ({
  type: CREATE_ISSUE,
  payload: {
    issue,
  },
});

export const updateIssue = (issue: IIssueCard): IUpdateIssue => ({
  type: UPDATE_ISSUE,
  payload: {
    issue,
  },
});

export const deleteIssue = (id: number): IDeleteIssue => ({
  type: DELETE_ISSUE,
  payload: {
    id,
  },
});

export const masterPlayer = (masterPlayer: boolean): IMasterPlayer => ({
  type: MASTER_PLAYER,
  payload: {
    masterPlayer,
  },
});

export const changingCard = (changingCard: boolean): IChangingCard => ({
  type: CHANGING_CARD,
  payload: {
    changingCard,
  },
});

export const timer = (timer: boolean): ITimer => ({
  type: TIMER,
  payload: {
    timer,
  },
});

export const scoreType = (scoreType: string): IScoreType => ({
  type: SCORE_TYPE,
  payload: {
    scoreType,
  },
});

export const scoreTypeShort = (scoreTypeShort: string): IScoreTypeShort => ({
  type: SCORE_TYPE_SHORT,
  payload: {
    scoreTypeShort,
  },
});

export const roundTime = (roundTime: number): IRoundTime => ({
  type: ROUND_TIME,
  payload: {
    roundTime,
  },
});

export const sessionConnect = (sessionExist: boolean): ISessionConnect => ({
  type: SESSION_EXIST,
  payload: {
    sessionExist,
  },
});

export const sessionConnectLoading = (
  sessionConnectLoading: boolean
): ISessionConnectLoading => ({
  type: SESSION_CONNECT_LOADING,
  payload: {
    sessionConnectLoading,
  },
});

export const requestEnter = (requestEnter: boolean): IRequestEnter => ({
  type: REQUEST_ENTER,
  payload: {
    requestEnter,
  },
});

export const deleteMember = (socketId: string): IDeleteMember => ({
  type: DELETE_MEMBER,
  payload: {
    socketId,
  },
});

export const getUsers = (users: IUser[]): IGetUsers => ({
  type: GET_USERS,
  payload: {
    users,
  },
});

export const requestRegistry = (params: { user: IUserRequest }) => {
  return async (dispatch: Dispatch) => {
    dispatch(getSessionError(null));
    dispatch(loadingSession(true));
    dispatch(loadedSession(false));

    try {
      const response: IResponse = await socket.send({
        type: "create",
        payload: {
          firstName: params.user.firstName,
          lastName: params.user.lastName,
          role: "dealer",
          observer: params.user.observer,
          job: params.user.job,
          avatar: params.user.avatar,
        },
      });

      dispatch(getSession(response));
      dispatch(loadedSession(true));

      socket.subscribeToUpdates<IResponse>((data) => {
        console.log(1);
        dispatch(getUsers(data.users));
      });
    } catch (e) {
      dispatch(getSessionError(e.message));
    } finally {
      dispatch(loadingSession(false));
    }
  };
};

export const requestSession = (params: { link: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(sessionConnectLoading(true));
    try {
      const response: boolean = await socket.check({
        type: "check",
        payload: {
          link: params.link,
        },
      });
      dispatch(sessionConnect(response));
      return response;
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(sessionConnectLoading(false));
    }
  };
};

export const requestLogin = (params: { hash: string; user: IUserRequest }) => {
  return (dispatch: Dispatch) => {
    const subscribeToUpdates = () => {
      socket.subscribeToUpdates<IResponse>((data) => {
        dispatch(getSession(data));
        dispatch(loadedSession(true));
      });
    };

    dispatch(loadedSession(false));
    subscribeToUpdates();
    socket.login(params.hash, params.user, (mess: string) => {
      if (mess !== "вошел") {
        dispatch(getSessionError("Something went wrong"));
      } else {
        dispatch(getSessionError("Something went wrong"));
      }
    });
  };
};
