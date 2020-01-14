const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import { SQLiteAccessor } from '../db/sqlite-accessor';
import { UserAppsHandler } from '../handlers/user-apps-handler';
const sqliteAccessor = new SQLiteAccessor();
const userAppsHandler = new UserAppsHandler(sqliteAccessor);

app.use(bodyParser.json());

app.get('/ping', async (req, res) => {
    res.send('Hello world');
});
app.get('/getUserAppsMetadata', async (req, res) => {
    res.send('Hello world');
});
app.post('/getAppUsers', async (req, res) => {
    res.send('Hello world');
});
app.post('/addUserToApp', async (req, res) => {
    res.send('Hello world');
});
app.post('/addUsersToApp', async (req, res) => {
    res.send('Hello world');
});
app.post('/updateUserAppPermissions', async (req, res) => {
    res.send('Hello world');
});
app.post('/removeUserFromApp', async (req, res) => {
    res.send('Hello world');
});
app.post('/removeUserFromAllApps', async (req, res) => {
    res.send('Hello world');
});
const port = 3000;
app.listen(port, () => console.log(`Express app listening on port ${port}!`));
