import { io } from "socket.io-client";

export const socket = io("https://okaychat.adaptable.app", {
  autoConnect: false,
});
