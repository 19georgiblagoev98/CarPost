const accessoryService = require('../services/accessory');
const authService = require('../services/auth');
const carService = require('../services/car');
module.exports = (app) => {
    app.use(accessoryService());
    app.use(authService());
    app.use(carService());
};