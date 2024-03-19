const mongoose = require('mongoose');
require('../models/Accessory');
require('../models/Car');
require('../models/User');
module.exports = async () => {
    try {
        const databaseName = 'carpost';
        const connectionString = `mongodb://localhost:27017/${databaseName}`;
        await mongoose.connect(connectionString);
        mongoose.connection.on('error', (err) => {
            throw new Error(err);
        });
    } catch (err) {
        process.exit(1);
    }
};