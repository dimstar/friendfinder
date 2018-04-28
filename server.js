const express = require('express');
const bparser = require('body-parser');
const log = console.log;
const Router = require('./app/routing/htmlRoutes.js');

const app = express();

router = new Router(app);

// middleware start
// parse application/x-www-form-urlencoded
app.use( bparser.urlencoded({ extended: false }) );
// parse application/json
app.use( bparser.json() );
// @todo make public directory accessible..


app.listen(1985, () => log('Example app listening on port 1985!'));