const { gql } = require('apollo-server');

module.exports = gql`
  type QuizTaken {
    quiz: [Quiz]!,
    pointsScored: Int!,
    timeTaken: String
  }
  type Questions {
    question: String!
    choices: [Choice],
    subtopic: String,
    points: Int!
  }
  type Choice {
    choice: String!
    answer: Boolean!
  }
  type Quiz {
    id: ID!
    postedBy: [User]!
    title: String!
    topic: String!
    timedQuiz: Boolean
    time: String
    questions: [Questions]
  }
  type User {
    id: ID!
    role: String!
    token: String!
    username: String!
    createdAt: String!
    password: String!
    quizTaken: [QuizTaken]
  }
  type Course {
    id: ID!
    title: String!
    description: String!
    quiz: [Quiz]
    createdBy: User
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    role: String!
  }
  input QuestionsInput {
    question: String!
    choices: [ChoiceInput!],
    subtopic: String,
    points: Int!,
  }
  input ChoiceInput {
    choice: String!
    answer: Boolean!
  }
  input CreateQuizInput {
    questions: [QuestionsInput]
    timedQuiz: Boolean
    time: String,
    title: String!
    topic: String!
  }
  type Query {
    getUsers: [User],
    getQuizs: [Quiz],
    getQuiz(quizId: ID!): Quiz,
    getCourses: [Course],
    getCourse(courseId: ID!): Course
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createQuiz(createQuizInput: CreateQuizInput, courseId: ID!): Quiz!
    submitQuiz(quizId: ID!, pointsScored: Int!): User!
    createCourse(title: String!, description: String): Course!
  }
`;