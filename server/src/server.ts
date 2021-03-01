import express from 'express';
const SocketIO = require('socket.io');

const crdt = {
    add: new Set<string>(),
    rem: new Set<string>(),
};
const app = express();
app.set("port", 4000);

let http = require("http").Server(app);
let io = SocketIO(http, {path:'/socket.io'});

io.on("connection", function(socket: any) {
    console.log("a user connected");

    socket.on("update", function(add: Set<string>, rem: Set<string>) {
        console.log(add, rem);
        socket.broadcast.emit("update1", add, rem);
        //io.emit("update1", add, rem);
    });
});


app.get('/', (req, res) => {
    res.send('hello world');
});

const server = http.listen(4000, function() {
    console.log("listening on *:4000");
});