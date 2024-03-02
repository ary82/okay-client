import { io } from "socket.io-client";

export const socket = io("https://okayapi.ary82.dev", {
  autoConnect: false,
});
