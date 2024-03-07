function carModel(car) {
    const carModel = {
        id: car._id,
        name: car.name,
        description: car.description,
        image: car.image,
        price: car.price,
        owner: car.owner,
        accessories: car.accessories
    };
    if (carModel.accessories.length > 0 && carModel.accessories[0]._id) {
        carModel.accessories = carModel.accessories.map(accessoryModel);
    }
    return carModel;
}
function accessoryModel(accessory) {
    const accessoryModel = {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        image: accessory.image,
        price: accessory.price,
        owner: accessory.owner
    };
    return accessoryModel;
}
module.exports = {
    carModel,
    accessoryModel
};