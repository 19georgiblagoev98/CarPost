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
            res.render('car/editCar', {
                title: 'Edit Car',
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
            const carAccessories = car.accessories;
            const editedCar = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                price: Number(req.body.price),
                accessories: carAccessories
            };
            const updatedCar = await req.carStorage.editCar(carId, editedCar);
            if (updatedCar == null) {
                res.redirect('/notFound');
                throw new Error('Car not found');
            }
            res.redirect('/details/car/' + carId);
        } catch (err) {
            res.locals.errors = mapError(err);
            res.redirect('/notFound');
        }
    }
};