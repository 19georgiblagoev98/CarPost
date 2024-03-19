const express = require('express');
const configDatabase = require('./config/database');
const configExpress = require('./config/express');
const configService = require('./config/service');
const configController = require('./config/controller');
start();
async function start() {
    const app = express();
    await configDatabase();
    configExpress(app);
    configService(app);
    configController(app);
    app.listen(3000, () => console.log('Server started on port 3000'));
}