// const { AuthenticationError, UserInputError } = require('apollo-server');

const Quiz = require("../../models/quizModel");
const Course = require("../../models/courseModel");
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Query: {
    async getQuizs() {
      const quiz = await Quiz.find();
      return quiz;
    },
    async getQuiz(_, { quizId }) {
      try {
        const quiz = await Quiz.findById(quizId);
        if (quiz) {
          return quiz;
        } else {
          throw new Error('Quiz not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createQuiz(_, { createQuizInput, courseId }, context) {
      const user = checkAuth(context);

      const { questions, timedQuiz, time } = createQuizInput
      if (!questions.length) {
        throw new Error('Minimum one question required');
      }
      if (timedQuiz && !time) {
        throw new Error('Timed Quiz should have time');
      }
      const course = await Course.findById(courseId)
      console.log(courseId, course)
      if(!course) {
        throw new Error('Course is required');
      }
      const newQuiz = new Quiz({
        ...createQuizInput,
        postedBy: user,
        createdAt: new Date().toISOString()
      });

      const quiz = await newQuiz.save();
      course.quiz = {
        ...quiz._doc,
        id: quiz._id
      }
      await course.save();

      return quiz;
    }
  }
};
