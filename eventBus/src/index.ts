import express from "express";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";
import { ports } from "../../utils";
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

const events: { type: string; data: any }[] = [];
const emitToAllSubs = async (ports: number[], event: any) => {
    events.push({
        data: event.data,
        type: event.type,
    });
    console.log(`emitting event ${event.type}`);
    const allSubs = ports.map((p) =>
        axios.post(`http://localhost:${p}/events`, event)
    );
    try {
        await Promise.all(allSubs);
    } catch (error) {
        console.log("Error while emitting ", error);
    }
    return
};
app.get("/events", (req, res) => {
    res.send(events);
});

app.post("/events", async (req, res) => {
    const event = req.body;
    const { comments, posts, query, moderation } = ports;
    const portsToCall = [comments, posts, query, moderation];
    await emitToAllSubs(portsToCall, event);
    res.status(200).json({ status: "OK" });
});

app.listen(ports.eventBus, () =>
    console.debug(`eventBus  service listening on port ${ports.eventBus}`)
);
