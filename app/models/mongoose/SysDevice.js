const mongoose = require('mongoose');

// fields definition
const fields = {
    token : {
        type : String // uuid
    },
    tokenKind: {
        type: String,
        enum: ['Generated', 'FCM', 'Provided']
    },
    kind: {
        type: String,
        enum: ['App', 'Browser', 'Unknown']
    },
    source: {
        type: String,
    },
    meta : {
        type : Object // {ip: '', os: '', browser: ''}
    },
    optionals: {
        type: Object 
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('SysDevice', schema);

module.exports = model;