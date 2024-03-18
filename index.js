const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const { body } = require('express-validator');
const attachAccessoryController = require('./controllers/accessory/attachAccessory');
const createAccessoryController = require('./controllers/accessory/createAccessory');
const loginController = require('./controllers/auth/login');
const logoutController = require('./controllers/auth/logout');
const registerController = require('./controllers/auth/register');
const createCarController = require('./controllers/car/createCar');
const deleteCarController = require('./controllers/car/deleteCar');
const detailsCarController = require('./controllers/car/detailsCar');
const editCarController = require('./controllers/car/editCar');
const homeController = require('./controllers/main/home');
const notFoundController = require('./controllers/main/notFound');
const initDatabase = require('./models/index');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');
const carService = require('./services/car');
const { isLoggedIn } = require('./utils/auth');
start();
async function start() {
    await initDatabase();
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.set('view engine', 'hbs');
    app.engine('hbs', hbs
        .create({ extname: '.hbs' })
        .engine);
    app.use(session({
        secret: 'g_jerry',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(authService());
    app.use(carService());
    app.use(accessoryService());
    app.get('/', homeController.get);
    app.route('/register')
        .get(registerController.get)
        .post(
            body('username')
                .trim()
                .isLength({ min: 5 })
                .withMessage('Username must be at least 5 characters long')
                .isAlphanumeric()
                .withMessage('Username must use alphanumeric characters only'),
            body('password')
                .trim()
                .isLength({ min: 8 })
                .withMessage('Password must be at least 8 characters long')
                .isAlphanumeric()
                .withMessage('Password must use alphanumeric characters only'),
            body('repeatPassword')
                .trim()
                .custom((value, { req }) => value == req.body.password)
                .withMessage('Passwords don\'t match'),
            registerController.post
        );
    app.route('/login')
        .get(loginController.get)
        .post(loginController.post);
    app.get('/logout', logoutController.get);
    app.get('/details/car/:id', detailsCarController.get);
    app.route('/create/car')
        .get(isLoggedIn(), createCarController.get)
        .post(isLoggedIn(), createCarController.post);
    app.route('/edit/car/:id')
        .get(isLoggedIn(), editCarController.get)
        .post(isLoggedIn(), editCarController.post);
    app.route('/delete/car/:id')
        .get(isLoggedIn(), deleteCarController.get)
        .post(isLoggedIn(), deleteCarController.post);
    app.route('/create/accessory')
        .get(isLoggedIn(), createAccessoryController.get)
        .post(isLoggedIn(), createAccessoryController.post);
    app.route('/attach/accessory/:id')
        .get(isLoggedIn(), attachAccessoryController.get)
        .post(isLoggedIn(), attachAccessoryController.post);
    app.all('*', notFoundController.get);
    app.listen(3000, () => console.log('Server started on port 3000'));
}