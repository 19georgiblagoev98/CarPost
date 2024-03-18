const { Schema, Types: { ObjectId }, model } = require('mongoose');
const carSchema = new Schema({
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
        type: Number,
        min: 0
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    accessories: {
        type: [ObjectId],
        ref: 'Accessory',
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
const Car = model('Car', carSchema);
module.exports = Car;