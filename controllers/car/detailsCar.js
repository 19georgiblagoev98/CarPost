const mapError = require('../../utils/error');
module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.carStorage.getCar(carId);
            if (car == undefined) {
                return res.redirect('/notFound');
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
            return res.redirect('/notFound');
        }
    }
};