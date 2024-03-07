const Accessory = require('../models/schemas/Accessory');
const Car = require('../models/schemas/Car');
const { accessoryModel } = require('../utils/model');
async function listAccessories() {
    const accessories = await Accessory.find({});
    if (accessories) {
        return accessories.map(accessoryModel);
    }
    return undefined;
}
async function createAccessory(newAccessory) {
    const accessory = new Accessory(newAccessory);
    if (accessory) {
        await accessory.save();
        return accessory;
    }
    return undefined;
}
async function attachAccessory(carId, accessoryId) {
    const attachedCar = await Car.findById(carId);
    if (attachedCar) {
        attachedCar.accessories.push(accessoryId);
        await attachedCar.save();
        return attachedCar;
    }
    return undefined;
}
module.exports = () => (req, res, next) => {
    req.accessoryStorage = {
        listAccessories,
        createAccessory,
        attachAccessory
    };
    next();
};