const mapError = require('../../utils/error');
module.exports = {
    get(req, res) {
        res.render('car/createCar', { title: 'Create Car' });
    },
    async post(req, res) {
        try {
            const newCar = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                price: Number(req.body.price),
                owner: req.session.user.id
            };
            await req.carStorage.createCar(newCar, req.session.user.id);
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('car/createCar', { title: 'Create Car' });
        }
    }
};