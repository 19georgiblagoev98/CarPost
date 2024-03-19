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
            }
            const password = req.body.password.trim();
            const repeatPassword = req.body.repeatPassword.trim();
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            if (password != repeatPassword) {
                throw new Error('Passwords don\'t match');
            }
            const user = await req.authStorage.register(username, password);
            if (user == null) {
                throw new Error('Username already exists');
            }
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('auth/register', {
                title: 'Register',
                data: { username }
            });
        }
    }
};