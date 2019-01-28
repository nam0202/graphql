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
            type:User,
            resolve:(story,args)=>{
                console.log(story.author);
                return userModel.getById(story.author)
            }
        }
    })
});

const User = new GraphQLObjectType({
    name:'User',
    description:'',
    fields:{
        id:{
            type:GraphQLInt
        },
        name:{
            type:GraphQLString,
            resolve:(user,args)=>{
                return user.name;
            }
        },
        stories:{
            type: new GraphQLList(Story),
            resolve:(user)=>{
                return userModel.getStoryByUser(user.id);
            }
        }
    }
})


const Query = new GraphQLObjectType({
    name: 'Query',
    description:'',
    fields: () => {
        return {
            user:{
                type: User,
                args:{
                    id:{
                        type: GraphQLInt
                    }
                },
                resolve: (parent,args)=>{
                    return userModel.getById(args.id);
                }
            },
            userList:{
                type: GraphQLList(User),
                args:{
                    name: {
                        type:GraphQLString
                    }
                },
                resolve: (source,args)=>{
                    console.log(args);
                    return userModel.findAll();
                }
            }
        }}
})

const Schema = new GraphQLSchema({
    query: Query
})

module.exports = Schema;