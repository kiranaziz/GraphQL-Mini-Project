const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        postId: {
            type: String, 
            required: true, 
        }, 
        content: {
            type: String, 
            required: true, 
        },
        likes: {
            type: Number, 
            required: true, 
        },
        dislikes: {
            type: Number, 
            required: true, 
        },
    },
    {
        timestamps: true,
    },
);

const comment = model('comment', commentSchema);

module.exports = comment;