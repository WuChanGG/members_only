const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.createMessageGet = (req, res, next) => {
    res.render('createMessage', { user: req.user });
}

exports.createMessagePost= [
    // Validate
    body('title').trim().isLength({ min: 1 }).withMessage("Message title must have at\
        least one character"),
    body('message').trim().isLength({ min: 1 }).withMessage("Message content\
        must be at least one character long."),
    (req, res, next) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('createMessage', { user: req.user, errors: 
                errors.array() });
        }

        const NewMessage = new Message({
            message: req.body.message,
            title: req.body.title,
            date: new Date(),
            user: req.user.id
        });

        NewMessage.save(err => {
            if (err) {
                return next(err);
            }

            // Redirect to home (message board)
            res.redirect('/');
        });
    }
]