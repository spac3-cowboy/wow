const mongoose = require('mongoose');

// fields definition
const fields = {
    roomId : {
        type : String
    },
    streamType:{
        type:String,
        enums:["SINGLE-STREAM","MULTI-STREAM","AUDIO-STREAM"]
    },
    roomType:{
        type:String,
        enums:["PUBLIC","PRIVATE"]
    },
    giftRatio:{
        type:Number,
        enums:[10,20,30,40,50]
    },
    Tags:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Tag"
        }
    ],
    seats: {
        type: Number
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: true})

// wrap schema with mongoose model
const model = mongoose.model('Room', schema);

module.exports = model;