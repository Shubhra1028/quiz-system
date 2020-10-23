const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");

const PORT = process.env.PORT || 5000

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({ req })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  }).catch(err => {
    console.error(err)
  });
