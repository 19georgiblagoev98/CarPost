const mapError = require('../../utils/error');
module.exports = {
    get(req, res) {
        res.render('createCar', { title: 'Create Car' });
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
            const car = await req.carStorage.createCar(newCar);
            if (car != undefined) {
                return res.redirect('/');
            }
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('createCar', { title: 'Create Car' });
        }
    }
};