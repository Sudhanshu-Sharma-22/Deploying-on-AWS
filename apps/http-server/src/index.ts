import express from "express"
import { client } from "@repo/db/client"

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("inside http server")
})

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = client.user.create({
        data: {
            username,
            password
        }
    })
    res.json({
        msg: "Signed up successfully",
        id: user
    })
})


app.listen(3001);