const express = require('express');
const app = express();
import { PingHandler } from '../handlers/ping-handler';
const pingHandler = new PingHandler();

app.get('/ping', async (req, res) => {
    res.send(await pingHandler.ping());
});
app.get('/ping-with-input', async (req, res) => {
    console.log('request received', req.query);
    res.send({ y: await pingHandler.ping_with_input(req.query.x) });
});

const port = 3000;
app.listen(port, () => console.log(`Express app listening on port ${port}!`));
