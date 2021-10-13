import io from "socket.io-client";
import { IUser, IUserRequest, Settings } from "../types";

export const socketIO = io("https://pointing-poker-be.herokuapp.com/", {
  transports: ["websocket", "polling"],
});

// export const socketIO = io("http://localhost:3000", {
//   transports: ["websocket", "polling"],
// });

interface ISendCreate {
  type: "create";
  payload: {
    firstName: string;
    lastName: string;
    role: string;
    observer: boolean;
    job?: string;
    avatar?: string;
  };
}

interface ISendCheck {
  type: "check";
  payload: {
    link: string;
  };
}

function send<T>(data: ISendCreate): Promise<T> {
  return new Promise((resolve) => {
    socketIO.emit(
      data.type,
      { ...data.payload, socket: socketIO.id },
      (data: T) => {
        resolve(data);
      }
    );
  });
}

function subscribeToUpdates<T>(fn: (data: T) => void) {
  socketIO.on("update", fn);
}

function check<T>(data: ISendCheck): Promise<T> {
  return new Promise((resolve) => {
    socketIO.emit(data.type, data.payload.link, (data: T) => {
      resolve(data);
    });
  });
}

function login(
  hash: string,
  data: IUserRequest,
  callback: (mess: string) => void
) {
  socketIO.emit("login", hash, { ...data, socket: socketIO.id }, callback);
}

function kick(socket: string) {
  socketIO.emit("kick", socket);
}

function kickForUserNotification(fn: () => void) {
  socketIO.on("kick", fn);
}

function loginRequestNotification(fn: (user: IUser) => void) {
  socketIO.on("loginRequest", fn);
}

function loginAllow(user: IUser) {
  socketIO.emit("loginAllow", user);
}

function loginDeny(user: IUser) {
  socketIO.emit("loginDeny", user);
}

function exit() {
  socketIO.emit("exit");
}

function updateSettings(setting: Settings, value: unknown) {
  socketIO.emit("update", { [setting]: value });
}

function runGame() {
  socketIO.emit("runGame");
}

function endGame() {
  socketIO.emit("endGame");
}

function runRound() {
  socketIO.emit("runRound");
}

function endRound() {
  socketIO.emit("endRound");
}

function addMsgToChat(user: IUser, msg: string) {
  socketIO.emit("addMsgToChat", user, msg);
}

function votingStart(whoSocket: string, whomSocket: string) {
  socketIO.emit("votingStart", whoSocket, whomSocket);
}

function vote(type: string) {
  socketIO.emit("vote", type);
}

export const socket = {
  send,
  check,
  login,
  subscribeToUpdates,
  kick,
  kickForUserNotification,
  loginRequestNotification,
  loginAllow,
  loginDeny,
  exit,
  updateSettings,
  runGame,
  endGame,
  runRound,
  endRound,
  addMsgToChat,
  votingStart,
  vote,
};
