const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    rolename: {
        type: String,
        required: true
    },

    permissionId: [{
        type: Schema.Types.ObjectId,
        ref: "Permission"
    }]
})

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;