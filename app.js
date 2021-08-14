//installing/requiring modules/files
const express = require('express');
const app = express();
const controller = require('./controllers/authControllers');
const { requireAuth, checkUser } = require('./middleware/authMiddlewares');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// const requireAuth = require('./controllers/authControllers');
const jwt = require('jsonwebtoken');
// const { checkUser } = require('./middleware/authMiddlewares');

//setting view engine
app.set('view engine', 'ejs');
//statc files
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());




controller.fun(app);
app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => {
    res.render('home.ejs');
});
app.get('/home', requireAuth, (req, res) => {
    res.render('home.ejs');
});

//listen server
const port = process.env.PORT||3000
app.listen(port, () => {
    console.log('Listening');
});