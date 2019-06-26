const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    topVideos(first: Int = 5): [Video]
  }

  type Video @key(fields: "id") {
    id: String!
    name: String
    url: String
    length: Int
  }
`;

const resolvers = {
  Video: {
    __resolveReference(object) {
      return videos.find(video => video.id === object.id);
    }
  },
  Query: {
    topVideos(_, args) {
      return videos.slice(0, args.first);
    }
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const videos = [
  {
    id: "1",
    name: "Video 1",
    url: '/video-1',
    length: 180
  },
  {
    id: "2",
    name: "Video 2",
    url: '/video-2',
    length: 120
  },
  {
    id: "3",
    name: "Video 3",
    url: '/video-3',
    length: 60
  }
];
