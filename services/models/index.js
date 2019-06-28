const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let idCount = 0;

const typeDefs = gql`
  type Model @key(fields: "id") {
    id: ID!
    name: String
    video: Video
  }

  extend type Video @key(fields: "id") {
    id: String! @external
    models: [Model]
  }

  type Mutation {
    addModel(name: String, videoId: String): Model
  }
`;

const resolvers = {
  Video: {
    models(video) {
      return models.filter(model => model.video.id === video.id)
    } 
  },
  Mutation: {
    addModel: (parent, args) => {
      const model = {
        id: `${idCount++}`,
        name: args.name,
        video: args.videoId ? { id: args.videoId } : null, 
      }
      models.push(model)
      return model;
   }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const models = [];
