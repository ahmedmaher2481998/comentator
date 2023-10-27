import express from "express";
import cors from "cors";
import morgan from "morgan";
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
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.post("/events", async (req, res) => {
    const { type, data } = req.body
    console.log("enet type from comments ", type);
    if (type === eventTypes.commentCreated) {
        const { id, content, postId } = data
        const status = content.includes('orange') ? "rejected" : "approved"
        await axios.post(`http://event-bus-srv:${ports.eventBus}/events`, {
            type: eventTypes.commentModerated, data: {
                postId, id, content, status
            }
        })
    }
    res.send({ status: "OK" });
});

app.listen(ports.moderation, () =>
    console.debug(
        `moderation service  service listening on port ${ports.moderation}`
    )
);
