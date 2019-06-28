const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let idCount = 0;

const typeDefs = gql`
  extend type Query {
    topVideos(first: Int = 5): [Video]
  }

  type Video @key(fields: "id") {
    id: String!
    name: String
    url: String
    length: String
  }

  type Mutation {
    addVideo(name: String, url: String, length: String): Video
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
  Mutation: {
    addVideo: (parent, args) => {
      const video = {
        id: `${idCount++}`,
        name: args.name,
        url: args.url,
        length: args.length,
      }
      videos.push(video)
      return video;
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

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const videos = [];
