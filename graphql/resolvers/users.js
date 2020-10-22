const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { validateLoginInput, validateRegisterInput } = require("../../utils/validators")

const { SECRET_KEY } = require("../../config");
const User = require("../../models/userModel");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    // login
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User Not Found";
        throw new UserInputError("User Not Found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // sign up
    async register(_, { registerInput: { username, role, password, confirmPassword } }) {
      console.log(username, role, password, confirmPassword);
      const { errors, valid } = validateRegisterInput(username, role, password, confirmPassword);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username Not Available", {
          errors: {
            username: "usrname already taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        role,
        username,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
