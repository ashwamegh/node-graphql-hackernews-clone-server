const {GraphQLServer} = require('graphql-yoga');
const path = require('path');


// Schema definition

let links = [{
  id: 'link-0',
  description: "Some link to test" ,
  url: 'www.howtographql.com'
}]

let idCount = links.length

// Resolver
const resolvers = {
  Query : {
    info : () => 'This is the resolver for hackernews clne',
    feed : () => links,
    link : (parent, args) => links.filter(item => item.id === args.id)
  },

  Mutation:{
    post: (parent,args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links.push(link);

      return link;
    },
    deleteLink: (parent, args) => {
      let deletedLink = {}
      links = links.filter((link) =>{ 
        if(link.id === args.id){
          deletedLink = link
        }
        return link.id !== args.id 
      })
      return [deletedLink];
    }, 

    updateLink: (parent, args) => {
      let updatedLink = {}
      links = links.filter((link) => {
        if(link.id === args.id){
          updatedLink = {
            id: link.id,
            url: args.url ? args.url : link.url,
            description: args.description ? args.description : link.description
          }
        }
        return link.id !== args.id
      })

      links.push(updatedLink)

      return [updatedLink]
    }
  }
}

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname,'./schema.graphql'), resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'));

