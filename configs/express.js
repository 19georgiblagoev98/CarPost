const express = require('express');
const { create: handlebars } = require('express-handlebars');
const session = require('express-session');
module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use('/statics', express.static('statics'));
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars({ extname: '.hbs' }).engine);
    app.use(session({
        secret: 'g_jerry',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
};