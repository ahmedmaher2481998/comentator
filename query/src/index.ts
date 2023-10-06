
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { eventTypes, ports } from "../../utils";
const app = express();
type PostsWithCommentsType = {
    [postId: string]: {
        title: string;
        comments: { id: string; content: string }[]

    }
}
const posts: PostsWithCommentsType = {}
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.get('/posts', (req, res) => {
    res.status(200).json(posts)
})
app.post('/events', (req, res) => {
    const type = req.body.type
    console.log('body from query', req.body.type);
    if (type === eventTypes.postCreated) {
        const data = req.body.data
        posts[`${data.id}`] = {
            comments: [],
            title: data.title
        }
        res.status(200).json(posts)
    }
    else if (type === eventTypes.commentCreated) {
        const data = req.body
        const comments = posts[`${data.postId}`].comments || []
        comments.push({
            content: data.content, id: data.id
        })
        posts[`${data.postId}`].comments = comments

        res.status(200).json(posts)
    }
    else {
        console.log('unknown event ', req.body.type);
        res.send({ status: "OK" })
    }

})


app.listen(ports.query, () => console.debug(`query service listening on port ${ports.query}`));
