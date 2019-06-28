import React, { useRef } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Mutation } from 'react-apollo';

const ADD_VIDEO = gql`
  mutation AddVideo($name: String, $url: String, $length: String) {
    addVideo(name: $name, url: $url, length: $length) {
      id
      name
      url
      length
    }
  }
`;

const ADD_MODEL = gql`
  mutation addModel($name: String, $videoId: String) {
    addModel(name: $name, videoId: $videoId) {
      id
      name
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4001",
});

function App() {
  const videoNameRef = useRef();
  const videoUrlRef = useRef();
  const videoLengthRef = useRef();
  const modelNameRef = useRef();
  const modelVideoIdRef = useRef();
  return (
    <ApolloProvider client={client}>
      <main>
        <Mutation mutation={ADD_VIDEO}>
          {(addVideo, { data }) => (
            <>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  addVideo({
                    variables: {
                      name: videoNameRef.current.value,  
                      url: videoUrlRef.current.value,
                      length: videoLengthRef.current.value,
                    }
                  });

                  videoNameRef.current.value = "";
                  videoUrlRef.current.value = "";
                  videoLengthRef.current.value = "";
                }}
              >
                <fieldset>New Video</fieldset>
                <label>Video name</label>
                <input type="text" ref={videoNameRef} />
                <label>Video Url</label>
                <input type="text" ref={videoUrlRef} />
                <label>Video length</label>
                <input type="text" ref={videoLengthRef} />
                <button type="submit">Add Video</button>
              </form>
              {data && (<div>{`Video ${data.addVideo.name} added with id: ${data.addVideo.id}`}</div>)}
            </>
          )}
        </Mutation>
        <Mutation mutation={ADD_MODEL}>
          {(addModel, { data }) => (
            <>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  addModel({
                    variables: {
                      name: modelNameRef.current.value,
                      videoId: modelVideoIdRef.current.value
                    }
                  })
                }}
              >
                <fieldset>New Model</fieldset>
                <label>Model Name</label>
                <input type="text" ref={modelNameRef} />
                <label>Video Id</label>
                <input type="text" ref={modelVideoIdRef} />
                <button type="submit">Add Model</button>
              </form>
              {data && (<div>{`Model ${data.addModel.name} has been added with id: ${data.addModel.id}`}</div>)}
            </>
          )}
        </Mutation>
      </main>
    </ApolloProvider>
  );
}

export default App;
