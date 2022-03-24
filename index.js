const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const user = require('./User');

const typeDefs = gql`


    type Query {
        getAllPosts: [Post!]!
        getPostsByUserId(userId: String!): [Post!]!
        whatever(email: String!): User
    }

    type Mutation {
        createUser(input: UserInput!): User!
    }

    type User {
        _id: ID!
        firstName: String! 
        lastName: String!
        email: String!
        password: String!
        posts: [Post!]!
    }

    input UserInput {
        firstName: String
        lastName: String
        email: String!
        password: String!
    }

    type Post {
        id: ID!
        userId: ID!
        content: String!
        likes: Int!
        dislikes: Int!
        comments: [Comment!]!

        # assume stored as unix timestamp
        createdAt: Int!
        updated: Int!
    }

    type Comment {
        id: ID!
        postId: String!
        content: String!
        likes: Int!
        dislikes: Int!

        createdAt: Int!
        updated: Int!        
    }

`;








const comments = [
    {
        id: 1, 
        postId: "1", 
        content: "haha", 
        likes: 100000, 
        dislikes: 34, 
        createdAt: 1637173045, 
        updatedAt: 1637173045,
    },
    {
        id: 2, 
        postId: "1", 
        content: "much wow", 
        likes: 32432, 
        dislikes: 19, 
        createdAt: 1637173045, 
        updatedAt: 1637173045,
    },
];

const posts = [
    {
        id: 1, 
        userId: "1", 
        content: "I'm so cool", 
        likes: 123, 
        dislikes: 0, 
        comments: comments, 
        createdAt: 1637173045, 
        updatedAt: 1637173045,
    },
];

const users = [
    {
        id: 1, 
        firstName: 'tony', 
        lastName: null, 
        email: 'tcomanzo@albany.edu', 
        password: 'password', 
        posts: posts, 
    },
];




const resolvers = {
    Query: {
        getAllPosts: () => posts,
        
        getPostsByUserId: function(parent, args, context, info ) {
            const userId = args.userId;
            let rv = [];
            for (let i = 0; i < posts.length; i++){
                const post = posts[i];
                if(post.userId === userId){
                    rv.push(post);
                }
            }
            return rv;
        },
        
        whatever: function(parent, args){
            //For each user in users list, we want to return a boolean
            //If the find function returns: False - no match, True - found a match
            return users.find(function(user){
                return user.email === args.email;
            });
        },
    },


    Mutation: {
        /* createUser: function(_, args) {
            //Make a new object that holds all the fields the user
            //inputted, and create a new user. Finally, push that
            //user to the users list.
            const input = args.input;
            const user = {
                _id: users.length + 1,
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: input.password,
                posts: [],
            };
            users.push(user);
            return user;
        }, */

        createUser: async function(_, args) {
            //Make a new object that holds all the fields the user
            //inputted, and create a new user. Finally, push that
            //user to the users list.
            const input = args.input;
            const model = {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: input.password,
                posts: [],
            };
            const newUser = new user(model);
            //Saves user to db. It also returns a promise.
            //Await keyword can only be used in async functions
            const result = await newUser.save(); 
            return result;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const db = 'mongodb+srv://admin:password123456789@cluster0.56amj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function() {
    console.log('connected to MongoDB');
    return server.listen();
}).then(function(result) {
    console.log(`🚀🚀🚀 Server ready at ${result.url}`);
});

//The "listen" function is asynchronous and 
//returns a promise.

//A promise guarantees some sort of return 
//value or error from that function.

//The "then" function performs its function when the first 
//function finishes its job.
/* server.listen().then(function({ url }) {
    console.log(`🚀🚀🚀 Server ready at ${url}`)
}); */

// ^^^Alternative version of the above code.
// const { url } = await server.listen();
// console.log(`🚀🚀🚀 Server ready at ${url}`);