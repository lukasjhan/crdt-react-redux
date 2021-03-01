"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SocketIO = require('socket.io');
const crdt = {
    add: new Set(),
    rem: new Set(),
};
const app = express_1.default();
app.set("port", 4000);
let http = require("http").Server(app);
let io = SocketIO(http, { path: '/socket.io' });
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("update", function (add, rem) {
        console.log(add, rem);
        socket.broadcast.emit("update1", add, rem);
        //io.emit("update1", add, rem);
    });
});
app.get('/', (req, res) => {
    res.send('hello world');
});
const server = http.listen(4000, function () {
    console.log("listening on *:4000");
});
