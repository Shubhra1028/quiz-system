const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    role: String!
    token: String!
    username: String!
    createdAt: String!
    password: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    role: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;