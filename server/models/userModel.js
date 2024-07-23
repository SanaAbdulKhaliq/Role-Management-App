const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roleId: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],

    permissionId: [{
        type: Schema.Types.ObjectId,
        ref: "Permission"
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;