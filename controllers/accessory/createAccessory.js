const mapError = require('../../utils/error');
module.exports = {
    get(req, res) {
        res.render('createAccessory', { title: 'Create Accessory' });
    },
    async post(req, res) {
        try {
            const newAccessory = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                price: Number(req.body.price),
                owner: req.session.user.id
            };
            const accessory = await req.accessoryStorage.createAccessory(newAccessory);
            if (accessory != undefined) {
                return res.redirect('/');
            }
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('createAccessory', { title: 'Create Accessory' });
        }
    }
};