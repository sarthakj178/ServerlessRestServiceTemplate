const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
import { PingHandler } from '../handlers/ping-handler';
import { SQLiteAccessor } from '../db/sqlite-accessor';
import { UserHandler } from '../handlers/user-handler';
const sqliteAccessor = new SQLiteAccessor();
const pingHandler = new PingHandler();
const userHandler = new UserHandler(sqliteAccessor);

app.get('/ping', async (req, res) => {
    res.send(await pingHandler.ping());
});
app.get('/ping-with-input', async (req, res) => {
    console.log('request received', req.query);
    res.send({ y: await pingHandler.ping_with_input(req.query.x) });
});

app.post('/save-user', async (req, res) => {
    console.log('save user request', req.body);
    try {
        await userHandler.saveUser(req.body);
        res.send({ message: 'Saved user' });
    } catch (error) {
        console.error(error);
        throw error;
    }
});
app.get('/get-user', async (req, res) => {
    console.log('get user request', req.query);
    try {
        const user = await userHandler.getUser(req.query.userId);
        res.send({
            user
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const port = 3000;
app.listen(port, () => console.log(`Express app listening on port ${port}!`));
