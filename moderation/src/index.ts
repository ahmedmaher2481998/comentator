import express from "express";
import cors from "cors";
import morgan from "morgan";
import { randomBytes } from "crypto";
import { eventTypes, ports } from "../../utils";
import axios from "axios";
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
        await axios.post(`http://localhost:${ports.eventBus}/events`, {
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
