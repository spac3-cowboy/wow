const mongoose = require('mongoose');

// fields definition
const fields = {
    kind: {
        type: String, // 'private', 'group'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], // array of user ids
    meta: {
        type: Object // {title: '', thumbnail: ''}
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('ChatThread', schema);

module.exports = model;