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
            const requesterId = req.session.user.id;
            const createdCar = await req.carStorage.createCar(newCar, requesterId);
            if (createdCar == null) {
                res.redirect('/notFound');
                throw new Error('User not found');
            }
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('car/createCar', { title: 'Create Car' });
        }
    }
};