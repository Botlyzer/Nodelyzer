const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./User');

const chatsessionSchema = new mongoose.Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  chat:
  [
    { bot:
      {
        time: {type: Date},
        message: { type: String, default: '' }
      },
      user:
      {
        time: {type: Date},
        message: { type: String, default: '' }
      }
    }
  ]
}, { timestamps: true });




const Chatsession = mongoose.model('Chatsession', chatsessionSchema);

module.exports = Chatsession;
