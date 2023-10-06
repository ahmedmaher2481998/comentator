
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { randomBytes } from 'crypto'
import axios from "axios";
import { eventTypes, ports } from "../../utils";
const posts: { [id: string]: { id: string; title: string } } = {}
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.get('/posts', (req, res) => {
    res.json({ posts })
})
app.post('/posts', async (req, res) => {
    const { title } = req.body
    const id = randomBytes(4).toString('hex')
    posts[`${id}`] = { id, title }
    await axios.post(`http://localhost:${ports.eventBus}/events`, { type: eventTypes.postCreated, data: { id, title } })
    res.status(201).json({ posts })
})
app.post('/events', (req, res) => {
    console.log('enet type from posts', req.body.type);
    res.send({ status: "OK" })

})


app.listen(ports.posts, () => console.debug(`posts service listening on port ${ports.posts}`));
