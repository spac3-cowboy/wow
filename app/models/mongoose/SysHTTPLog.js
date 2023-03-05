const mongoose = require('mongoose');

// fields definition
const fields = {
    token : {
        type : String // uuid
    },
    
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('SysHTTPLog', schema);

module.exports = model;