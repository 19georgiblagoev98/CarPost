const { validationResult } = require('express-validator');
const mapError = require('../../utils/error');
module.exports = {
    get(req, res) {
        res.render('auth/register', { title: 'Register' });
    },
    async post(req, res) {
        const username = req.body.username;
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            } else {
                const password = req.body.password;
                const user = await req.authStorage.register(username, password);
                if (user != undefined) {
                    return res.redirect('/');
                }
            }
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('auth/register', {
                title: 'Register',
                data: { username }
            });
        }
    }
};