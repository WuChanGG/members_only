const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// TODO(Wuhie): Add an admin member to the schema that allows admins to delete
// messages
// TODO(Wuhie): Add a logout page
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, minLength: 5},
    password: { type: String, required: true},
    fullName: { type: String, required: true, unique: true },
    membershipStatus: { type: String, enum: ["User", "ProUser"],
        required: true},
});

module.exports = new mongoose.model("User", UserSchema);