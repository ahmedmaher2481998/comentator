import express from "express";
import cors from "cors";
import morgan from "morgan";
import { eventTypes, ports } from "../../utils";
const app = express();
type CommentType = { id: string; content: string; status: "pending" | "approved" | "rejected" }
type PostsWithCommentsType = {
    [postId: string]: {
        id: string;
        title: string;
        comments: CommentType[];
    };
};
const posts: PostsWithCommentsType = {};
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});
app.post("/events", (req, res) => {

    const { type, data } = req.body;

    console.log("enet type from query", type);
    if (type === eventTypes.postCreated) {
        posts[`${data.id}`] = {
            comments: [],
            id: data.id,
            title: data.title,
        };
        res.send({ status: "OK" });
    } else if (type === eventTypes.commentCreated) {
        const comments = posts[`${data.postId}`].comments || [];
        comments.push({
            content: data.content,
            id: data.id, status: data.status
        });
        posts[`${data.postId}`].comments = comments;

        res.send({ status: "OK" });
    } else if (type === eventTypes.commentUpdated) {
        const comment: CommentType & { postId: string } = data
        const post = posts[`${comment.postId}`]
        const myComment = post.comments.find(c => c.id === comment.id)
        myComment!.content = comment.content
        myComment!.status = comment.status
        res.send({ status: "OK" });
    } else {
        console.log("received event ", type);
        res.send({ status: "OK" });
    }
});

app.listen(ports.query, () =>
    console.debug(`query service listening on port ${ports.query}`)
);
