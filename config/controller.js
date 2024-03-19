const { body } = require('express-validator');
const attachAccessoryController = require('../controllers/accessory/attachAccessory');
const createAccessoryController = require('../controllers/accessory/createAccessory');
const loginController = require('../controllers/auth/login');
const logoutController = require('../controllers/auth/logout');
const registerController = require('../controllers/auth/register');
const createCarController = require('../controllers/car/createCar');
const deleteCarController = require('../controllers/car/deleteCar');
const detailsCarController = require('../controllers/car/detailsCar');
const editCarController = require('../controllers/car/editCar');
const homeController = require('../controllers/main/home');
const notFoundController = require('../controllers/main/notFound');
const { isLoggedIn } = require('../utils/auth');
function configController(app) {
    app.route('/attach/accessory/:id')
        .get(isLoggedIn(), attachAccessoryController.get)
        .post(isLoggedIn(), attachAccessoryController.post);
    app.route('/create/accessory')
        .get(isLoggedIn(), createAccessoryController.get)
        .post(isLoggedIn(), createAccessoryController.post);
    app.route('/login')
        .get(loginController.get)
        .post(loginController.post);
    app.get('/logout', logoutController.get);
    app.route('/register')
        .get(registerController.get)
        .post(
            body('username')
                .trim()
                .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
                .isAlphanumeric().withMessage('Username must use alphanumeric characters only'),
            body('password')
                .trim()
                .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
                .isAlphanumeric().withMessage('Password must use alphanumeric characters only'),
            body('repeatPassword')
                .trim()
                .custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
            registerController.post
        );
    app.route('/create/car')
        .get(isLoggedIn(), createCarController.get)
        .post(isLoggedIn(), createCarController.post);
    app.route('/delete/car/:id')
        .get(isLoggedIn(), deleteCarController.get)
        .post(isLoggedIn(), deleteCarController.post);
    app.get('/details/car/:id', detailsCarController.get);
    app.route('/edit/car/:id')
        .get(isLoggedIn(), editCarController.get)
        .post(isLoggedIn(), editCarController.post);
    app.get('/', homeController.get);
    app.all('*', notFoundController.get);
}
module.exports = configController;