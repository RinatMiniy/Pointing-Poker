import io from "socket.io-client";

const socketIO = io("https://pointing-poker-be.herokuapp.com/", {
  transports: ["websocket", "polling"],
});

interface ISendCreate {
  type: "create";
  payload: {
    firstName: string;
    lastName: string;
    role: string;
    observer: boolean;
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

export const socket = {
  send,
};
