const mongoose = require('mongoose');
const {v4 : uuidv4} = require('uuid');

const userSchema = new mongoose.Schema({
  id : {type : String , default : uuidv4},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);

