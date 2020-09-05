const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;