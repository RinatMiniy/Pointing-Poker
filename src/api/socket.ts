import io from "socket.io-client";
import { IUserRequest } from "../types";

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

export const socket = {
  send,
  check,
  login,
  subscribeToUpdates,
  kick,
  kickForUserNotification,
};
