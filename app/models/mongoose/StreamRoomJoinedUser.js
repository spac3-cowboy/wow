const mongoose = require("mongoose");

// fields definition
const fields = {
  email: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
};

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, { timestamps: true });

// wrap schema with mongoose model
const model = mongoose.model("StreamRoomJoinedUser", schema);

module.exports = model;
