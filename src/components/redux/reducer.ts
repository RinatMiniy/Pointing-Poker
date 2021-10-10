import { createStore } from "redux";
import { SetCards } from "../../types";
import {
  IUnion,
  GET_SESSION,
  GET_SESSION_ERROR,
  LOADING_SESSION,
  LOADED_SESSION,
  SESSION_EXIST,
  SESSION_CONNECT_LOADING,
  CHAT_OPEN,
  SESSION_RESET,
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
  game: {
    runGame: false,
    endGame: false,
    runRound: false,
    endRound: false,
    time: 0,
    issue: 0,
  },
  voting: {
    run: false,
    whoSocket: "",
    whomSocket: "",
    votes: [],
  },
  chat: [],
  chatOpen: false,
};

export function reducer(state: IStore = initialState, action: IUnion): IStore {
  switch (action.type) {
    case GET_SESSION:
      return {
        ...state,
        ...action.payload.session,
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

    case CHAT_OPEN:
      return {
        ...state,
        chatOpen: action.payload.chatOpen,
      };

    case SESSION_RESET:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
}

export const store = createStore(reducer);
