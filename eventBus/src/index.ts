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




app.post('/events', async (req, res) => {
    const event = req.body
    const local = 'http://localhost:'
    await axios.post(`${local}${ports.posts}/events`, event)
    await axios.post(`${local}${ports.comments}/events`, event)
    await axios.post(`${local}${ports.query}/events`, event)

    res.status(200).json({ status: "OK" })
})


app.listen(ports.eventBus, () => console.debug(`eventBus  service listening on port ${ports.eventBus}`));
