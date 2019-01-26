const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql')

const UserModel = require('./model')

var userModel = new UserModel();
const User = new GraphQLObjectType({
    name: 'User',
    description: 'this graphql of user',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: (user) => {
                return user.id;
            }
        },
        name: {
            type: GraphQLString,
            resolve: (user) => {
                return user.name;
            }
        },
        stories:{
            type: new GraphQLList(Story),
            resolve:(parent,args)=>{
                console.log('step User123');
                return userModel.getAllStory(parent.id);
            }
        }

    })
})

const Story = new GraphQLObjectType({
    name: 'Story',
    fields: ()=>({
        id:{
            type: GraphQLID
        },
        text:{
            type: GraphQLString
        },
        author:{
            type:User
        }
    })
});
const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query Object',
    fields: () => {
        return {
            userlist: {
                type: new GraphQLList(User),
                args: {
                    limit: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    id: {
                        type: GraphQLInt
                    },
                    name: {
                        type: GraphQLString
                    }
                },
                resolve: (root, args) => {
                    return userModel.findAll(args);
                }
            },
            user:{
                type: User,
                args:{
                    id:{
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve: (parent,{id})=>{
                    console.log('step user');
                    return userModel.getById(id);
                }
            },
            viewer :{
                type:User,
                resolve:(parent ,args, {userId})=>{
                    console.log(userId);
                    return userModel.getById(userId)
                }
        }
        }}
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Function to set stuff',
    fields() {
        return {
            addUser: {
                type: User,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, args) => {
                    console.log(args, root);
                    return userModel.addUser({
                        name: name
                    })
                }
            },
            updateUser: {
                type: User,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, args) => {
                    console.log(args, root);
                    return userModel.updateUser({
                        id: args.id,
                        name: args.name,
                    })
                }
            },
            deleteUser: {
                type: GraphQLInt,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (root, args) => {
                    return userModel.deleteUser(args.id)
                }
            }
        }
    }

})

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema;