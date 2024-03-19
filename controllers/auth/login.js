const mapError = require('../../utils/error');
module.exports = {
    get(req, res) {
        res.render('auth/login', { title: 'Login' });
    },
    async post(req, res) {
        try {
            const username = req.body.username.trim();
            const password = req.body.password.trim();
            const user = await req.authStorage.login(username, password);
            if (user == null) {
                throw new Error('Incorrect username or password');
            }
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('auth/login', { title: 'Login' });
        }
    }
};