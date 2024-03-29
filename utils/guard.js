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
module.exports = isLoggedIn;