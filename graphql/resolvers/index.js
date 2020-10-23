const userResolvers = require("./users")
const quizResolvers = require("./quiz")
const courseResolvers = require("./course")

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...courseResolvers.Query,
        ...quizResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...courseResolvers.Mutation,
        ...quizResolvers.Mutation
    }
}