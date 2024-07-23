const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    permissionstatus: {
        type: String,
        default: 'No Permission'
    },

    defaultRoute: {
        type: String,
        default: '/'
    }
})

const Permission = mongoose.model('Permission', permissionSchema)
module.exports = Permission;