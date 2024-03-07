const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const mapError = require('../../utils/error');
const router = Router();
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register',
    body('username')
        .trim()
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username must use alphanumeric characters only'),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAlphanumeric().withMessage('Password must use alphanumeric characters only'),
    body('repeatPassword')
        .trim()
        .custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {
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
            res.render('register', {
                title: 'Register',
                data: { username }
            });
        }
    }
);
module.exports = router;