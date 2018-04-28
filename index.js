const express = require('express');
const bparser = require('body-parser');
const log = console.log;
const TemplateRouter = require('./app/routing/htmlRoutes.js');
const ApiRouter = require('./app/routing/apiRoutes.js');

const app = express();

// middleware start
// parse application/x-www-form-urlencoded
app.use( bparser.urlencoded({ extended: false }) );
// parse application/json
app.use( bparser.json() );
// @todo make public directory accessible..
app.use( express.static('app/public/assets') );

// middleware
// app.use('/api/friends', function (req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     // add a jedi to firebase
//     log(req.body);
    
//     // console.log(JSON.stringify(req.body, null, 2));
//     res.end(JSON.stringify(req.body, null, 2));
// });

templaterouter = new TemplateRouter(app);
apirouter = new ApiRouter(app);

// local
// app.listen(1985, () => log('Example app listening on port 1985!'));
// heroku
app.listen(process.env.PORT, () => log('Example app listening on port 1985!'));