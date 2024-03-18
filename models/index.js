const mongoose = require('mongoose');
require('./schemas/Accessory');
require('./schemas/Car');
require('./schemas/User');
async function initDatabase() {
    try {
        const connectionString = 'mongodb://localhost:27017/carpost';
        await mongoose.connect(connectionString);
        mongoose.connection.on('error', (err) => {
            throw new Error(err);
        });
    } catch (err) {
        process.exit(1);
    }
}
module.exports = initDatabase;