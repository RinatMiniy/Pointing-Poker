import { IStore } from "./types";

export const selectState = (state: IStore) => state;

export const selectUsers = (state: IStore) => state.users;

export const selectIssues = (state: IStore) => state.issues;

export const selectSettings = (state: IStore) => state.settings;

export const selectSessionTitle = (state: IStore) => state.title;

export const selectSessionHash = (state: IStore) => state.hash;

export const selectCards = (state: IStore) => state.cards;

export const selectError = (state: IStore) => state.error;

export const selectLoading = (state: IStore) => state.loading;

export const selectLoaded = (state: IStore) => state.loaded;

export const selectSessionExist = (state: IStore) => state.sessionExist;

export const selectGame = (state: IStore) => state.game;

export const selectAll = (state: IStore) => state;
