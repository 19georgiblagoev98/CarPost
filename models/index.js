const mongoose = require('mongoose');
require('./schemas/Accessory');
require('./schemas/Car');
require('./schemas/User');
const connectionString = 'mongodb://localhost:27017/carpost';
async function initDatabase() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        });
        mongoose.connection.on('error', (err) => {
            throw new Error(err);
        });
    } catch (err) {
        process.exit(1);
    }
}
module.exports = initDatabase;