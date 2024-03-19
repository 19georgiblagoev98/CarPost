const User = require('../models/User');
async function register(session, username, password) {
    const isUserExists = await User.findOne({ username });
    if (!isUserExists) {
        const user = new User({
            username,
            hashedPassword: password
        });
        session.user = {
            id: user._id,
            username: user.username
        };
        return await user.save();
    } else {
        return null;
    }
}
async function login(session, username, password) {
    const user = await User.findOne({ username });
    if (user) {
        const comparedPassword = await user.comparePassword(password);
        if (comparedPassword) {
            session.user = {
                id: user._id,
                username: user.username
            };
            return user;
        }
    } else {
        return null;
    }
}
function logout(session) {
    delete session.user;
}
module.exports = () => (req, res, next) => {
    const user = req.session.user;
    if (user) {
        res.locals.user = user;
        res.locals.hasUser = true;
    }
    const session = req.session;
    req.authStorage = {
        register: (...params) => register(session, ...params),
        login: (...params) => login(session, ...params),
        logout: () => logout(session)
    };
    next();
};