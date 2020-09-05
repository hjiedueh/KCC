const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		min: 1,
        max: 150,
        required: true
	},
	body: {
		type: String,
		min: 3,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
}, {
	timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post