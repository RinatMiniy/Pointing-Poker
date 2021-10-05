import { IIssueCard, IUserRequest } from "../../types";
import { socket } from "../../api/socket";
import { Dispatch } from "redux";
import { IResponse } from "./types";

export const SEND_ACTIVE_USER = "SEND_ACTIVE_USER";
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

export type ISendActiveUser = {
  type: typeof SEND_ACTIVE_USER;
  payload: {
    user: IUserRequest;
  };
};

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
    roundTime: string;
  };
};

export type IUnion =
  | ISendActiveUser
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
  | IRoundTime;

export const sendActiveUser = (user: IUserRequest) => ({
  type: SEND_ACTIVE_USER,
  payload: {
    user,
  },
});

export const getSession = (session: IResponse) => ({
  type: GET_SESSION,
  payload: {
    session,
  },
});

export const getSessionError = (err: string | null) => ({
  type: GET_SESSION_ERROR,
  payload: {
    err,
  },
});

export const loadingSession = (loading: boolean) => ({
  type: LOADING_SESSION,
  payload: {
    loading,
  },
});

export const loadedSession = (loaded: boolean) => ({
  type: LOADED_SESSION,
  payload: {
    loaded,
  },
});

export const updateTitle = (title: string) => ({
  type: UPDATE_TITLE,
  payload: {
    title,
  },
});

export const createIssue = (issue: IIssueCard) => ({
  type: CREATE_ISSUE,
  payload: {
    issue,
  },
});

export const updateIssue = (issue: IIssueCard) => ({
  type: UPDATE_ISSUE,
  payload: {
    issue,
  },
});

export const deleteIssue = (id: number) => ({
  type: DELETE_ISSUE,
  payload: {
    id,
  },
});

export const masterPlayer = (masterPlayer: boolean) => ({
  type: MASTER_PLAYER,
  payload: {
    masterPlayer,
  },
});

export const changingCard = (changingCard: boolean) => ({
  type: CHANGING_CARD,
  payload: {
    changingCard,
  },
});

export const timer = (timer: boolean) => ({
  type: TIMER,
  payload: {
    timer,
  },
});

export const scoreType = (scoreType: string) => ({
  type: SCORE_TYPE,
  payload: {
    scoreType,
  },
});

export const scoreTypeShort = (scoreTypeShort: string) => ({
  type: SCORE_TYPE_SHORT,
  payload: {
    scoreTypeShort,
  },
});

export const roundTime = (roundTime: string) => ({
  type: ROUND_TIME,
  payload: {
    roundTime,
  },
});

export const requstRegistry = (params: { user: IUserRequest }) => {
  console.log("user", params.user.avatar);
  return async (dispatch: Dispatch) => {
    dispatch(sendActiveUser(params.user));
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
      console.log(response);
      dispatch(getSession(response));
      dispatch(loadedSession(true));
    } catch (e) {
      dispatch(getSessionError(e.message));
    } finally {
      dispatch(loadingSession(false));
    }
  };
};
