const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const typeDefs = `
type Query {
  info: String!
  feed: [Place!]!
  place(id: ID!): Place
}

type Mutation {
  post(name: String!, type: String!, guests: String!): Place!
  updatePlace(id: ID!, name: String, type: String, guests: String): Place
  deletePlace(id: ID!): Place
}

type Place {
  id: ID!
  name: String!
  type: String!
  guests: String!
}
`;

const resolvers = {
  Query: {
    info: () => `This is the API of a places for rent database`,
    feed: async (parent, args, context) => {
      return await context.prisma.place.findMany();
    },
    place: async (parent, args, context) => {
      return await context.prisma.place.findOne({
        where: {
          id: parseInt(args.id),
        },
      });
    },
  },
  Mutation: {
    post: async (parent, args, context, info) => {
      const newRecord = context.prisma.place.create({
        data: {
          name: args.name,
          type: args.type,
          guests: args.guests,
        },
      });
      return newRecord;
    },
    updatePlace: async (parent, args, context, info) => {
      let place = {};
      if (args.name) {
        place.name = args.name;
      }
      if (args.type) {
        place.type = args.type;
      }
      if (args.guests) {
        place.guests = args.guests;
      }
      return await context.prisma.place.update({
        where: { id: parseInt(args.id) },
        data: place,
      });
    },
    deletePlace: async (parent, args, context, info) => {
      return await context.prisma.place.delete({
        where: { id: parseInt(args.id) },
      });
    },
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs, //"./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

// Start server with command:
// node src/index.js

/*
Run GraphQL Playground IDE with these CRUD graphql queries:

query {
  feed {
    id
    name 
    type
    guests
  }
}


mutation {
  post(
    name: "Jeremy"
    type: "House"
    guests: "8"
  ) {
    id
  }
}

mutation {
  post(
    name: "Sherly"
    type: "Apartment"
    guests: "4"
  ) {
    id
  }
}

query {
  place (
    id: "2"
  ) {
    id
    name 
    type
    guests
  }
}

mutation {
  updatePlace(
    id: "2"    
    type: "House"
  ) {
    id
    name 
    type
    guests
  }
}

mutation {
  deletePlace(
    id: "1"
  ) {
    id 
  }
}


*/
