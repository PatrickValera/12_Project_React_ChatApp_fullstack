import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    // console.log(socket.id)
    socket.on("sendMessage", ({ text }) => {
        // const user = getUser(receiverId);
        io.emit("getMessage", {
            text,
        });
    });
});

io.listen(8900);