import { WebSocketServer } from "ws"
import { client } from "@repo/db/client"

const server = new WebSocketServer({
    port: 8080
});

server.on("connection", async (socket) => {
    const createdUser = await client.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    console.log(createdUser)
    socket.send("connected successfully")
})