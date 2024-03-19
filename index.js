const express = require('express');
const controllerConfig = require('./config/controller');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const portConfig = require('./config/port');
const serviceConfig = require('./config/service');
start();
async function start() {
    const app = express();
    await databaseConfig();
    expressConfig(app);
    serviceConfig(app);
    controllerConfig(app);
    portConfig(app);
}