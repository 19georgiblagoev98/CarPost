const express = require('express');
const { create: handlebars } = require('express-handlebars');
const session = require('express-session');
function configExpress(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars({ extname: '.hbs' }).engine);
    app.use(session({
        secret: 'g_jerry',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
}
module.exports = configExpress;