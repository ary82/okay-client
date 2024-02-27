import { io } from "socket.io-client";

export const socket = io("http://ec2-13-127-44-116.ap-south-1.compute.amazonaws.com:3000", {
  autoConnect: false,
});
