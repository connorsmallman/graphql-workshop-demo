## Kodify GraphQL demo

### Installation

To run this demo locally, pull down the repository then run the following commands:

```sh
npm install
```

This will install all of the dependencies for the gateway and each underlying service.

```sh
npm run start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:4002 and http://localhost:4003

In another terminal window, run the gateway by running this command:

```sh
npm run start-gateway
```

This will start up the gateway and serve it at http://localhost:4001


In another terminal window, run the gateway by running this command:

```sh
npm run start-client
```

This will start up the client, open in your browser at http://localhost:4000 to see the top videos rendered with model names

```