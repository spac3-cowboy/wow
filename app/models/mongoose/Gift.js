const mongoose = require('mongoose');

// fields definition
const fields = {
   gift_item:{
    type:mongoose.Types.ObjectId,
    required:true,
   },
   sender:{
    type:mongoose.Types.ObjectId,
    required:true,
   },
   receiver:{
    type:mongoose.Types.ObjectId,
    required:true,
   }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('Gift', schema);

module.exports = model;