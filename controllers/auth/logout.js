const { Router } = require('express');
const router = Router();
router.get('/logout', (req, res) => {
    req.authStorage.logout();
    return res.redirect('/');
});
module.exports = router;