import express from "express";
import cors from "cors";
import morgan from "morgan";
import { randomBytes } from "crypto";
import axios from "axios";

export const ports = {
    client: 3000,
    posts: 5000,
    comments: 5001,
    query: 5002,
    moderation: 5003,
    eventBus: 5050
}


export enum eventTypes {
    postCreated = "post_create",
    commentCreated = "comment_created",
    commentModerated = "comment_moderated",
    commentUpdated = "comment_updated"
}

type CommentType = {
    id: string;
    content: string;
    // postId: string;
    status: "pending" | "approved" | "rejected";
}
const commentsByPost: {
    [postID: string]: CommentType[];
} = {};
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
    const status = "pending";
    comments.push({
        content,
        id,
        status
    });

    commentsByPost[`${postId}`] = comments;
    await axios.post(`http://event-bus-srv:${ports.eventBus}/events`, {
        type: eventTypes.commentCreated,
        data: {
            id,
            content,
            postId: req.params.id, status
        },
    });
    console.log('Added Comment with postID', postId)
    res.status(201).json(comments);
});

app.post("/events", async (req, res) => {
    console.log("event  type from comments ", req.body.type);
    const { type } = req.body
    const data: CommentType & { postId: string } = req.body.data
    const { content, id, postId, status } = data
    if (type === eventTypes.commentModerated) {
        const comments = commentsByPost[`${postId}`]
        console.log('Comments===========>', comments)
        const comment = comments.find(c => c.id === id)
        comment!.content = content;
        comment!.status = status

        await axios.post(`http://event-bus-srv:${ports.eventBus}/events`, {
            type: eventTypes.commentUpdated,
            data: {
                id, postId, content, status
            }
        })
    }
    res.send({ status: "OK" });
});

app.listen(ports.comments, () =>
    console.debug(`comments service  service listening on port ${ports.comments}`)
);
