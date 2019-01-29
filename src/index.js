const {GraphQLServer} = require('graphql-yoga');


// Schema definition

const typeDefs = `
  type Query {
    info: String!
    users: [User!]!
    user(id: ID!) : User
  }
  type Mutation {
    createUser(name: String!): User! 
  }

  type User {
    id: ID!
    name: String!
  }
  `;

// Resolver
const resolvers = {
  Query : {
    info : () => 'This is the resolver for hackernews clne'
  }
}

const server = new GraphQLServer({
  typeDefs, resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'));

