import 'cross-fetch/polyfill';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: "http://localhost:4001"
});

client
  .query({
    query: gql`
        {
            topVideos {
                name
                url
                length
                models {
                    name
                }
            }
        }
    `
  })
  .then(console.log)
  .catch(console.log);

const TopVideos = () => (
    <Query
      query={gql`
        {
            topVideos {
                name
                url
                length
                models {
                    name
                }
            }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.topVideos.map(video => (
          <div key={video.id} >
            {video.name}
            {video.url}
            {video.length}
            {video.models.map(model => model.name).join('')}
          </div>
        ));
      }}
    </Query>
  );

const Html = (props) => {
    return (
        <html>
            <head>
                <title>App</title>
            </head>
            <body>
                {props.children}
            </body>
        </html>
    );
};

const app = express();
const port = 4000;

app.get('/', (req, res) => res.send(ReactDOMServer.renderToStaticMarkup(
    <Html>
        <ApolloProvider client={client}>
            <TopVideos />
        </ApolloProvider>
    </Html>
)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))