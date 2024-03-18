module.exports = {
    get(req, res) {
        req.authStorage.logout();
        return res.redirect('/');
    }
};