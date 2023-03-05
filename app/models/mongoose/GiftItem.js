const mongoose = require('mongoose');

// fields definition
const fields = {
   price:{
    type:Number,
    required:true
   },
   pk_power:{
    type:Number,
    required:true
   },
   imageURL:{
    type:String,
    required:true
   }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('GiftItem', schema);

module.exports = model;