const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

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
`;

const resolvers = {
  Video: {
    models(video) {
      return models.filter(model => model.video.id === video.id)
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

const models = [
  {
    id: "1",
    name: "model 1",
    video: { id: "1" },
  },
  {
    id: "2",
    name: "model 2",
    video: { id: "2" },
  },
  {
    id: "3",
    name: "model 3",
    video: { id: "3" },
  },
  {
    id: "4",
    name: "model 4",
    video: { id: "1" },
  }
];
