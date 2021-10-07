import { IIssueCard, IUser, IUserRequest, Settings } from "../../types";
import { socket } from "../../api/socket";
import { Dispatch } from "redux";
import { IResponse } from "./types";

export const GET_SESSION = "GET_SESSION";
export const GET_SESSION_ERROR = "GET_SESSION_ERROR";
export const LOADING_SESSION = "LOADING_SESSION";
export const LOADED_SESSION = "LOADED_SESSION";
export const UPDATE_ISSUE = "UPDATE_ISSUE";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const UPDATE_VALUE_CARD = "UPDATE_VALUE_CARD";
export const GET_USERS = "GET_USERS";

export const SESSION_EXIST = "SESSION_EXIST";
export const SESSION_CONNECT_LOADING = "SESSION_CONNECT_LOADING";

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

export type IValueCard = {
  type: typeof UPDATE_VALUE_CARD;
  payload: {
    card: { id: number; value: string };
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

export type IGetUsers = {
  type: typeof GET_USERS;
  payload: {
    users: IUser[];
  };
};

export type IUnion =
  | IGetSession
  | IGetSessionError
  | ILoadingSession
  | ILoadedSession
  | IUpdateIssue
  | IDeleteIssue
  | IValueCard
  | ISessionConnect
  | ISessionConnectLoading
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

export const updateValueCard = (params: {
  id: number;
  value: string;
}): IValueCard => ({
  type: UPDATE_VALUE_CARD,
  payload: {
    card: { id: params.id, value: params.value },
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
        console.log(data);
        dispatch(getSession(data));
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
      dispatch(getSessionError(e.message));
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
      }
    });
  };
};

export const requestUpdate = (setting: Settings, value: unknown) => {
  socket.updateSettings(setting, value);
};
