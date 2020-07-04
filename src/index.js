const { GraphQLServer } = require('graphql-yoga')

const { prisma } = require('../prisma/generated/prisma-client')

/* The typeDefs constant defines your GraphQL schema (more about this in a bit). 
Here, it defines a simple Query type with one field called info. This field has the type String!. 
The exclamation mark in the type definition means that this field can never be null. */
const typeDefs = ""; // currently typedefs is extracted to schema.graphql file

/* The links variable is used to store the links at runtime. For now, everything is stored only in-memory rather than being persisted in a database */
// let links = [{
//   id: 'link-0',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }]

// let idCount = links.length

/* The resolvers object is the actual implementation of the GraphQL schema. 
Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info. */
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // feed: () => links,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    // link: (parent, args) => links.find(x => x.id === args.id)
    link: (root, args, context) => {
      return context.prisma.link({id: args.id});
    },
  },

  Mutation: {
    // createLink: (parent, args) => {
    //    let link = {
    //     id: `link-${idCount++}`,
    //     description: args.description,
    //     url: args.url,
    //   }
    //   links.push(link)
    //   return link
    // },
    createLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    deleteLink: (root, args, context) => {
      return context.deleteLink({id: args.id});
    }
    // updateLink: (parent, args) => {
    //   let link = {
    //    id: `link-${args.id}`,
    //    url: args.url,
    //    description: args.description
    //   }

    //   let index = links.findIndex(x => x.id === args.id)
    //   links[index] = link;
    //   return link;
    // },
    // deleteLink: (parent, args) => {
    //    return links.pop(args.id);
    // }
  },

  /* adding three more resolvers for the fields on the Link type from the schema definition. 
    When we have such a trivial resolvers for every field of Link, we could omit them */
  /*Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }*/
}

/* Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga. 
This tells the server what API operations are accepted and how they should be resolved. */
const server = new GraphQLServer({
  typeDefs : './src/schema.graphql', //typeDefs can be provided either directly as a string or by referencing a file that contains your schema definition
  resolvers,
  context : { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))