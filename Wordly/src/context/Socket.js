import { io } from 'socket.io-client';

const url1 = "http://localhost:8000";
const url2 = "https://multi-wordly-backend.herokuapp.com/";

export const socket = io(url2);