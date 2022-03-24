const { model, Schema } = require('mongoose');

const postSchema = new Schema(
    {
        userId: {
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
        comments: [
            {
                type: Schema.Types.ObjectId, 
                ref: "comment",
                required: true, 
            },
        ],
    },
    {
        timestamps: true,
    },
);

const post = model('post', postSchema);

module.exports = post;