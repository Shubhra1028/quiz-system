const { model, Schema } = require("mongoose")

const UserSchema = new Schema({
    username: String,
    password: String,
    role: String,
    createdAt: String,
})

module.exports = model('user', UserSchema);