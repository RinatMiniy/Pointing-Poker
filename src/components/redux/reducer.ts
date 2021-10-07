import { createStore } from "redux";
import { SetCards } from "../../types";
import {
  IUnion,
  GET_SESSION,
  GET_SESSION_ERROR,
  LOADING_SESSION,
  LOADED_SESSION,
  UPDATE_ISSUE,
  DELETE_ISSUE,
  SESSION_EXIST,
  SESSION_CONNECT_LOADING,
  GET_USERS,
  UPDATE_VALUE_CARD,
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
    roundTime: 140,
    scoreType: "story point",
    scoreTypeShort: "SP",
    timer: true,
    autoLogin: false,
    flipCards: false,
    setCards: SetCards.fibonacci,
  },
  cards: [],
  error: null,
  loading: false,
  loaded: false,
  sessionExist: false,
  sessionConnectLoading: false,
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
        cards: action.payload.session.cards,
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

    case SESSION_EXIST: {
      return {
        ...state,
        sessionExist: action.payload.sessionExist,
      };
    }

    case SESSION_CONNECT_LOADING:
      return {
        ...state,
        sessionConnectLoading: action.payload.sessionConnectLoading,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };

    case UPDATE_VALUE_CARD:
      return {
        ...state,
        cards: state.cards.map((card, idx) =>
          action.payload.card.id === idx ? action.payload.card.value : card
        ),
      };

    default:
      return state;
  }
}

export const store = createStore(reducer);
