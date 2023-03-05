const mongoose = require('mongoose');

// fields definition
const fields = {
  text:{
    type:String,
    required:true
  },
  region:{
    type:String,
  },
  ageLimit:{
    type:Number,
  },
  religionView:{
    type:String
  },
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('Tag', schema);

module.exports = model;