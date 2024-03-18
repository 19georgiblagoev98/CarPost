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
            if (req.session.user && car.owner == req.session.user.id) {
                car.isOwner = true;
            }
            res.render('car/detailsCar', {
                title: 'Details Car',
                car
            });
        } catch (err) {
            res.locals.errors = mapError(err);
            res.redirect('/notFound');
        }
    }
};