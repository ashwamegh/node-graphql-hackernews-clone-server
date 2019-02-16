const {GraphQLServer} = require('graphql-yoga');
const path = require('path');
// require('./prisma-demo');
const { prisma } = require('./generated/prisma-client')


// Schema definition

// Resolver
const resolvers = {
  Query : {
    info : () => 'This is the resolver for hackernews clne',
    feed : (root, args, context, info) => {
      return context.prisma.links
    },
    link : (parent, args) => context.prisma.links.filter(item => item.id === args.id)
  },

  Mutation:{
    post: (parent,args, context, info) => {
      const link = {
        description: args.description,
        url: args.url
      }

      return context.prisma.createLink(link);
    }
    // deleteLink: (parent, args) => {
    //   let deletedLink = {}
    //   links = links.filter((link) =>{ 
    //     if(link.id === args.id){
    //       deletedLink = link
    //     }
    //     return link.id !== args.id 
    //   })
    //   return [deletedLink];
    // }, 

    // updateLink: (parent, args) => {
    //   let updatedLink = {}
    //   links = links.filter((link) => {
    //     if(link.id === args.id){
    //       updatedLink = {
    //         id: link.id,
    //         url: args.url ? args.url : link.url,
    //         description: args.description ? args.description : link.description
    //       }
    //     }
    //     return link.id !== args.id
    //   })

    //   links.push(updatedLink)

    //   return [updatedLink]
    // }
  }
}

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname,'./schema.graphql'), 
  resolvers,
  context: { prisma }
})

server.start(() => console.log('Server is running on http://localhost:4000'));

