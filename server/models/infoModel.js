const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
})

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;