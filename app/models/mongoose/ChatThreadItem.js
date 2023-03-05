const mongoose = require('mongoose');

// fields definition
const fields = {
    chatThreadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatThread'
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    kind: {
        type: String,
        enums: ["TEXT", "IMAGE", "VIDEO", "AUDIO", "FILE"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('ChatThreadItem', schema);

module.exports = model;