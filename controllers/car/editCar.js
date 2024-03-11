const mapError = require('../../utils/error');
module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.carStorage.getCar(carId);
            if (car == undefined) {
                return res.redirect('/notFound');
            }
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                req.authStorage.logout();
                return res.redirect('/login');
            }
            res.render('car/editCar', {
                title: 'Edit Car',
                car
            });
        } catch (err) {
            res.locals.errors = mapError(err);
            return res.redirect('/notFound');
        }
    },
    async post(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.carStorage.getCar(carId);
            if (car == undefined) {
                return res.redirect('/notFound');
            }
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                req.authStorage.logout();
                return res.redirect('/login');
            }
            const carAccessories = car.accessories;
            const editedCar = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                price: Number(req.body.price),
                accessories: carAccessories
            };
            const carEdit = await req.carStorage.editCar(carId, editedCar);
            if (carEdit != undefined) {
                return res.redirect('/');
            }
        } catch (err) {
            res.locals.errors = mapError(err);
            return res.redirect('/notFound');
        }
    }
};