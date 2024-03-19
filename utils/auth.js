const { hash, compare } = require('bcrypt');
async function hashPassword(password) {
    return await hash(password, 10);
}
async function comparePassword(password, hashedPassword) {
    return await compare(password, hashedPassword);
}
module.exports = {
    hashPassword,
    comparePassword
};