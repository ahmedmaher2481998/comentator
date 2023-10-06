
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ports } from "../../ports";
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.post('/events', (req, res) => {
    console.log('body from query', req.body);
    res.send({ status: "OK" })

})


app.listen(ports.query, () => console.debug(`posts service listening on port ${ports.query}`));
