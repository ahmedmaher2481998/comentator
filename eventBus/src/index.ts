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
    eventBus: 5050,
};

export enum eventTypes {
    postCreated = "post_create",
    commentCreated = "comment_created",
    commentModerated = "comment_moderated",
    commentUpdated = "comment_updated",
}

const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

const events: { type: string; data: any }[] = [];

const emitToAllSubs = async (urls: string[], event: any) => {
    events.push({
        data: event.data,
        type: event.type,
    });

    console.log(`emitting event ${event.type}`);

    const allSubs = urls.map((url) => axios.post(`${url}/events`, event));

    try {
        await Promise.all(allSubs);
    } catch (error) {
        console.log("Error while emitting ", error);
    }
    return;
};
app.get("/events", (req, res) => {
    res.send(events);
});

app.post("/events", async (req, res) => {
    const event = req.body;
    console.log(`intercepted event of type =  ${event.type}`);
    const { comments, posts, query, moderation } = ports;
    const allUrls = [
        `http://posts-clusterip-srv:${posts}`,
        `http://comments-srv:${comments}`,
        `http://moderation-srv:${moderation}`,
        `http://query-srv:${query}`,
    ];
    await emitToAllSubs(allUrls, event);
    res.status(200).json({ status: "OK" });
});

app.listen(ports.eventBus, () =>
    console.debug(`eventBus  service listening on port ${ports.eventBus}`)
);
