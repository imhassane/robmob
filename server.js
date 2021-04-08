const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

const DB = [];

const server = http.createServer((req, res) => {
    try {
        if(req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/html"});
            const content = fs.readFileSync(__dirname + "/interface.html");
            res.write(content);
        }
    } catch {
        res.write("Une erreur");
    } finally {
        return res.end();
    }
});
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('command:run', (commands) => {
        console.log(commands)
        io.emit("command:retrieve", commands)
    });


    socket.on('command:get', () => {
        io.emit('command:retrieve', DB.join(""));
    });
});



server.listen(8080);
