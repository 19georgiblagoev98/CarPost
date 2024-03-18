module.exports = {
    get(req, res) {
        res.render('auth/login', { title: 'Login' });
    },
    async post(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const user = await req.authStorage.login(username, password);
            if (user) {
                return res.redirect('/');
            }
        } catch (err) {
            res.locals.errors = [{ msg: err.message }];
            res.render('auth/login', { title: 'Login' });
        }
    }
};