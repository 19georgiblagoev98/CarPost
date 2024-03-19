const accessoryService = require('../services/accessory');
const authService = require('../services/auth');
const carService = require('../services/car');
function configService(app) {
    app.use(accessoryService());
    app.use(authService());
    app.use(carService());
}
module.exports = configService;