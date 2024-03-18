const Accessory = require('../models/schemas/Accessory');
const Car = require('../models/schemas/Car');
const { accessoryModel } = require('../utils/model');
async function listAccessories() {
    const accessories = await Accessory.find({});
    return accessories.length > 0 ? accessories.map(accessoryModel) : [];
}
async function createAccessory(newAccessory) {
    const accessory = new Accessory(newAccessory);
    return await accessory.save();
}
async function attachAccessory(carId, accessoryId) {
    const attachedCar = await Car.findById(carId);
    if (attachedCar == null) {
        return null;
    }
    attachedCar.accessories.push(accessoryId);
    await attachedCar.save();
    return attachedCar;
}
module.exports = () => (req, res, next) => {
    req.accessoryStorage = {
        listAccessories,
        createAccessory,
        attachAccessory
    };
    next();
};