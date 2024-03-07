const bcrypt = require('bcrypt');
async function hashPassword(password) {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
}
async function comparePassword(password, hashedPassword) {
    const comparedPassword = bcrypt.compare(password, hashedPassword);
    return comparedPassword;
}
function isLoggedIn() {
    return function (req, res, next) {
        const user = req.session.user;
        if (user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}
module.exports = {
    hashPassword,
    comparePassword,
    isLoggedIn
};