const mapError = require('../../utils/error');
module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const [car, accessories] = await Promise.all([
                req.carStorage.getCar(carId),
                req.accessoryStorage.listAccessories()
            ]);
            if (car == undefined) {
                return res.redirect('/notFound');
            }
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                req.authStorage.logout();
                return res.redirect('/login');
            }
            if (accessories != undefined) {
                const accessoryIds = car.accessories.map(a => a.id.toString());
                const availableAccessories = accessories.filter(a => accessoryIds.includes(a.id.toString()) == false);
                res.render('accessory/attachAccessory', {
                    title: 'Attach Accessory',
                    car,
                    accessories: availableAccessories
                });
            }
        } catch (err) {
            res.locals.errors = mapError(err);
            return res.redirect('/notFound');
        }
    },
    async post(req, res) {
        const carId = req.params.id;
        try {
            const car = await req.carStorage.getCar(carId);
            if (car == undefined) {
                return res.redirect('/notFound');
            }
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                req.authStorage.logout();
                return res.redirect('/login');
            }
            const accessoryId = req.body.accessory;
            const attachedCar = await req.accessoryStorage.attachAccessory(carId, accessoryId);
            if (attachedCar != undefined) {
                return res.redirect('/details/car/' + carId);
            }
        } catch (err) {
            res.locals.errors = mapError(err);
            return res.redirect('/attach/accessory/' + carId);
        }
    }
};