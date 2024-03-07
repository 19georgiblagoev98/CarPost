const Car = require('../models/schemas/Car');
const { carModel } = require('../utils/model');
async function getCar(carId) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    if (car) {
        return carModel(car);
    }
    return undefined;
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
    if (cars) {
        return cars.map(carModel);
    }
    return undefined;
}
async function createCar(newCar) {
    const car = new Car(newCar);
    if (car) {
        await car.save();
        return car;
    }
    return undefined;
}
async function editCar(carId, editedCar) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    if (car) {
        car.name = editedCar.name;
        car.description = editedCar.description;
        car.image = editedCar.image;
        car.price = editedCar.price;
        editedCar.accessories.map(a => car.accessories.push(a));
        await car.save();
        return car;
    }
    return undefined;
}
async function deleteCar(carId) {
    const car = await Car
        .findById(carId)
        .where({ isDeleted: false });
    if (car) {
        await Car.findByIdAndUpdate(carId, { isDeleted: true });
        await car.save();
        return car;
    }
    return undefined;
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