const mapError = require('../../utils/error');
module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.carStorage.getCar(carId);
            if (car == null) {
                res.redirect('/notFound');
                throw new Error('Car not found');
            }
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                req.authStorage.logout();
                res.redirect('/login');
                throw new Error('The user of the request is not the owner of the car');
            }
            res.render('car/deleteCar', {
                title: 'Delete Car',
                car
            });
        } catch (err) {
            res.locals.errors = mapError(err);
            res.redirect('/notFound');
        }
    },
    async post(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.carStorage.deleteCar(carId);
            if (car == null) {
                throw new Error('Car not found');
            }
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.redirect('/notFound');
        }
    }
};