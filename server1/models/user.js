const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

function toLower(v) {
  return v.toLowerCase();
}

const User = new Schema({
    email: {
        type: String,
        set: toLower
    },
    admin:   {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);