const mapError = require('../../utils/error');
module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const [car, accessories] = await Promise.all([
                req.carStorage.getCar(carId),
                req.accessoryStorage.listAccessories()
            ]);
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
            if (accessories != []) {
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
            res.redirect('/notFound');
        }
    },
    async post(req, res) {
        const carId = req.params.id;
        try {
            const accessoryId = req.body.accessory;
            const [car, attachedCar] = await Promise.all([
                req.carStorage.getCar(carId),
                req.accessoryStorage.attachAccessory(carId, accessoryId)
            ]);
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
            if (attachedCar == null) {
                res.redirect('/notFound');
                throw new Error('Car not found');
            }
            res.redirect('/details/car/' + carId);
        } catch (err) {
            res.locals.errors = mapError(err);
            res.redirect('/attach/accessory/' + carId);
        }
    }
};