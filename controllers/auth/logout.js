module.exports = {
    get(req, res) {
        req.authStorage.logout();
        res.redirect('/');
    }
};