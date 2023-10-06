import express from "express";
import cors from "cors";
import morgan from "morgan";
import { randomBytes } from "crypto";
import { eventTypes, ports } from "../../utils";
import axios from "axios";
const posts: { [id: string]: { id: string; title: string } } = {};
const commentsByPost: { [postID: string]: { id: string; content: string }[] } =
    {};
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPost[`${postId}`] || [];
    res.json(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;
    const id = randomBytes(4).toString("hex");
    const comments = commentsByPost[`${postId}`] || [];
    comments.push({
        content,
        id,
    });
    await axios.post(`http://localhost:${ports.eventBus}/events`, {
        type: eventTypes.commentCreated, data: {
            id, content, postId: req.params.id
        }
    })
    commentsByPost[`${postId}`] = comments
    res.status(201).json(comments)
});




app.post('/events', (req, res) => {
    console.log('body from comments ', req.body.type);
    res.send({ status: "OK" })

})


app.listen(ports.comments, () =>
    console.debug(`comments service  service listening on port ${ports.comments}`)
);