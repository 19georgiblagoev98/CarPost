const { Schema, Types: { ObjectId }, model } = require('mongoose');
const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        min: 0
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});
const Accessory = model('Accessory', accessorySchema);
module.exports = Accessory;