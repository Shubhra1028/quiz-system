const userResolvers = require("./users")

module.exports = {
    Mutation: {
        ...userResolvers.Mutation
    }
}