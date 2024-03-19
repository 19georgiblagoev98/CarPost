const Accessory = require('../models/Accessory');
const Car = require('../models/Car');
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
    const attachedCar = await Car
        .findById(carId)
        .where({ isDeleted: false })
        .populate('accessories');
    if (attachedCar == null) {
        return null;
    }
    attachedCar.accessories.push(accessoryId);
    return await attachedCar.save();
}
module.exports = () => (req, res, next) => {
    req.accessoryStorage = {
        listAccessories,
        createAccessory,
        attachAccessory
    };
    next();
};