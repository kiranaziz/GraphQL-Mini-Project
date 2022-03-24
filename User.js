const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false, // Required - determines if it is nullable or not.
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "post",
            required: true, 
        },
    ],
});

//The line below wraps our schema into a big object, 
//and exposes various functions to us.
const user = model('user', userSchema);

module.exports = user;