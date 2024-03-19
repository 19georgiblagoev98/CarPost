const Car = require('../models/Car');
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
async function createCar(newCar) {
    const car = new Car(newCar);
    return await car.save();
}
async function editCar(carId, editedCar) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    car.name = editedCar.name;
    car.description = editedCar.description;
    car.image = editedCar.image;
    car.price = editedCar.price;
    return await car.save();
}
async function deleteCar(carId) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false });
    if (car == null) {
        return null;
    }
    await Car.findByIdAndUpdate(carId, { isDeleted: true });
    return await car.save();
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