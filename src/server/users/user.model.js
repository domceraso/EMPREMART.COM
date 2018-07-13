const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * USER SCHEMA
 */

const schema = new Schema({
    
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },

    firstName: { 
        type: String, 
        required: true 
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    lastName: { 
        type: String, 
        required: true 
    },

    roles: [{ 
        type: 'String' 
    }],

    hash: { 
        type: String, 
        required: true 
    },

    isVerified: { 
        type: Boolean, 
        default: false 
    },

    passwordResetToken: String,

    passwordResetExpires: Date, 

    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', schema);