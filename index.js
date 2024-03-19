const express = require('express');
const controllerConfig = require('./configs/controller');
const databaseConfig = require('./configs/database');
const expressConfig = require('./configs/express');
const portConfig = require('./configs/port');
const serviceConfig = require('./configs/service');
start();
async function start() {
    const app = express();
    await databaseConfig();
    expressConfig(app);
    serviceConfig(app);
    controllerConfig(app);
    portConfig(app);
}