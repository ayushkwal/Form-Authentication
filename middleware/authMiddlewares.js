const jwt = require('jsonwebtoken');
const controller = require('../controllers/authControllers');
const mongoose = require('mongoose');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        console.log('token found')
        jwt.verify(token, 'ayush secret key', function(err, decodedToken) {
            if (err) {
                res.redirect('/login');

            } else {
                next();
            }
        })

    } else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'ayush secret key', async(err, decodedToken) => {
            if (err) {
                res.locals.username = '';
                next();

            } else {
                console.log(decodedToken.id);
                let user = await controller.data.findOne({_id:decodedToken.id});
                console.log(user,'ssssss');
                res.locals.username = user.username;
                next();
            }
        });
    } else {
        res.locals.username = '';
        next();
    }
}


module.exports = { requireAuth, checkUser };