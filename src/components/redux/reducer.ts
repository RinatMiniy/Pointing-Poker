import { createStore } from "redux";
import {
  IUnion,
  GET_SESSION,
  UPDATE_TITLE,
  GET_SESSION_ERROR,
  LOADING_SESSION,
  LOADED_SESSION,
  CREATE_ISSUE,
  UPDATE_ISSUE,
  DELETE_ISSUE,
  MASTER_PLAYER,
  CHANGING_CARD,
  TIMER,
  SCORE_TYPE,
  SCORE_TYPE_SHORT,
  ROUND_TIME,
} from "./actions";
import { IStore } from "./types";

const initialState: IStore = {
  title: "",
  hash: "",
  users: [],
  issues: [],
  settings: {
    changingCard: false,
    masterPlayer: true,
    roundTime: "140",
    scoreType: "story point",
    scoreTypeShort: "SP",
    timer: true,
  },
  activeUser: null,
  error: null,
  loading: false,
  loaded: false,
};

export function reducer(state: IStore = initialState, action: IUnion): IStore {
  switch (action.type) {
    case GET_SESSION:
      return {
        ...state,
        title: action.payload.session.title,
        hash: action.payload.session.hash,
        users: action.payload.session.users,
        issues: action.payload.session.issues,
        settings: action.payload.session.settings,
        activeUser: action.payload.session.users[0],
      };

    case LOADING_SESSION:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case LOADED_SESSION:
      return {
        ...state,
        loaded: action.payload.loaded,
      };

    case GET_SESSION_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case UPDATE_TITLE:
      return { ...state, title: action.payload.title };

    case CREATE_ISSUE:
      return { ...state, issues: state.issues.concat(action.payload.issue) };

    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.issue.id ? action.payload.issue : issue
        ),
      };

    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter((issue) => issue.id !== action.payload.id),
      };

    case MASTER_PLAYER:
      return {
        ...state,
        settings: {
          ...state.settings,
          masterPlayer: action.payload.masterPlayer,
        },
      };

    case CHANGING_CARD:
      return {
        ...state,
        settings: {
          ...state.settings,
          changingCard: action.payload.changingCard,
        },
      };

    case TIMER:
      return {
        ...state,
        settings: {
          ...state.settings,
          timer: action.payload.timer,
        },
      };

    case SCORE_TYPE:
      return {
        ...state,
        settings: {
          ...state.settings,
          scoreType: action.payload.scoreType,
        },
      };

    case SCORE_TYPE_SHORT:
      return {
        ...state,
        settings: {
          ...state.settings,
          scoreTypeShort: action.payload.scoreTypeShort,
        },
      };

    case ROUND_TIME:
      return {
        ...state,
        settings: {
          ...state.settings,
          roundTime: action.payload.roundTime,
        },
      };

    default:
      return state;
  }
}

export const store = createStore(reducer);
