const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { required: true, type: String },
    title: { required: true, type: String },
    date: { required: true, type: Date },
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('message', MessageSchema);