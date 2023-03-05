const mongoose = require('mongoose');

// fields definition
const fields = {
    name: {
        type: String
    },
    code: {
        type: String    
    },
    flag: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('Country', schema);

module.exports = model;