const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

exports.userRegisterGet = function(req, res, next) {
    res.render('userRegisterForm');
};

exports.userRegisterPost = [
    body('username').trim().isLength({ min: 4 })
        .escape().withMessage('Username must be at least 4 characters')
        .isAlphanumeric().withMessage('Username must have alphanumeric\
        characters only'),
    body('password').escape().isLength({ min: 6 }).withMessage("Password\
        must be at least 6 characters long"),
    body('fullName').escape().isLength({ min: 1 }).withMessage("You must\
        write a full name"),
    
    (req, res, next) => {
        let failUserObject = {
            username: req.body.username,
            fullName: req.body.fullName
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.render('userRegisterForm', { failedUserObject: failUserObject, errors: errors.array() });
        }
        
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }

            failUserObject.membershipStatus = "User";
            failUserObject.password = hashedPassword;
            let newUser = new User(failUserObject);

            newUser.save(err => {
                if (err) {
                    return next(err);
                }
            });
            // redirect to login
            res.redirect('/');
        });
    }
];

exports.userLoginGet = (req, res, next) => {
    res.render('userLogin', { user: req.user });
}

exports.userLoginPost = passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login"
});

exports.userDashboardGet = (req, res, next) => {
    res.render('dashboard', {user: req.user});
};

exports.userDashboardPost = (req, res, next) => {
    req.body.password = req.body.password.toLowerCase();
    if (req.body.password === "pikachu") {
        let updatedUser = new User({
            fullName: req.user.fullName,
            username: req.user.username,
            password: req.user.password,
            membershipStatus: "ProUser",
            _id: req.user.id
        });

        User.findByIdAndUpdate(req.user.id, updatedUser, {}, function (err, theNewUser) {
            if (err) {
                return next(err);
            }

            console.log(theNewUser);
            res.render('dashboard', {user: req.user});
        });
        
    }
    else
    {
        res.render('dashboard', { user: req.user, error: "You entered the incorrect secret password! Try again." });
    }
};