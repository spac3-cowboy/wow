const mongoose = require('mongoose');

// fields definition
const fields = {
    
    // yet to be implemented for future use
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('UserProfile', schema);

module.exports = model;