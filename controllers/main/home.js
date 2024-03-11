const mapError = require('../../utils/error');
module.exports = {
    async get(req, res) {
        try {
            const query = req.query;
            const cars = await req.carStorage.listCars(query);
            res.render('home', {
                title: 'Home',
                cars,
                query
            });
        } catch (err) {
            res.locals.errors = mapError(err);
            return res.redirect('/notFound');
        }
    }
};