const Car = require('../models/Car');
const User = require('../models/User');
const { carModel } = require('../utils/model');
async function getCar(carId) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    return car ? carModel(car) : null;
}
async function listCars(query) {
    const filterCriteria = { isDeleted: false };
    if (query.search) {
        filterCriteria.name = new RegExp(query.search, 'i');
    }
    if (query.priceFrom) {
        filterCriteria.price = { $gte: Number(query.priceFrom) };
    }
    if (query.priceTo) {
        if (!filterCriteria.price) {
            filterCriteria.price = {};
        }
        filterCriteria.price.$lte = Number(query.priceTo);
    }
    const cars = await Car.find(filterCriteria);
    return cars.length > 0 ? cars.map(carModel) : [];
}
async function createCar(newCar, requesterId) {
    const car = new Car(newCar);
    const user = await User.findById(requesterId);
    if (user == null) {
        return null;
    }
    user.posts.push(car._id);
    return await Promise.all([
        car.save(),
        user.save()
    ]);
}
async function editCar(carId, editedCar) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    if (car == null) {
        return null;
    }
    car.name = editedCar.name;
    car.description = editedCar.description;
    car.image = editedCar.image;
    car.price = editedCar.price;
    return await car.save();
}
async function deleteCar(carId, requesterId) {
    const [car, user] = await Promise.all([
        await Car.findByIdAndUpdate(carId, { isDeleted: true }),
        await User.findById(requesterId)
    ]);
    if (car == null || user == null) {
        return null;
    }
    user.posts
        .map(p => p.toString())
        .forEach((ci, i) => {
            if (ci.includes(carId)) {
                user.posts.splice(i, 1);
                return;
            }
        });
    return await Promise.all([
        await car.save(),
        await user.save()
    ]);
}
module.exports = () => (req, res, next) => {
    req.carStorage = {
        getCar,
        listCars,
        createCar,
        editCar,
        deleteCar
    };
    next();
};