const mongoose = require("mongoose");

// fields definition
const fields = {
  name: {
    type: String, //name
  },
  uid: {
    type: String, // e.g. '1234567890' - Auto Generated //firebase
  },
  email: {
    type: String, //email
  },
  password: {
    type: String,
  },
  socialLogin: {
    type: Object, // {provider: '', id: '', token: '', email: '', name: '', image: ''}
  },
  phoneNumber: {
    type: String, //firebase
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  geoLocation: {
    type: Object, // {lat: '', lng: ''}
  },
  dob: {
    type: Date,
  },
  profileImage: {
    type: String, // firebase
  },
  otherImages: {
    type: Array,
  },
  baseRole: {
    type: String,
    enum: ["Official", "Agent", "User"],
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  currentDiamonds: {
    type: Number,
    default: 0,
  },
  currentBeans: {
    type: Number,
    default: 0,
  },
  isBroadcaster: {
    type: Boolean,
    default: false,
  },
  userLevel: {
    type: Number,
    default: 1,
  },
  brodcasterLevel: {
    type: Number,
    default: 1,
  },
  currentFriends: {
    type: Number,
    default: 0,
  },
  currentFollowers: {
    type: Number,
    default: 0,
  },
  currentFollowings: {
    type: Number,
    default: 0,
  },
  currentVIP: {
    // Current VIP Package Info
    type: Object, // {packageId: '', startDate: '', endDate: ''}
  },
  meta: {
    type: Object, // {ip: '', os: '', browser: ''}
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, { timestamps: true });

// wrap schema with mongoose model
const model = mongoose.model("User", schema);

module.exports = model;
