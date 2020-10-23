const { model, Schema } = require("mongoose");

const QuizSchema = new Schema({
  postedBy: Array,
  title: String,
  topic: String,
  timedQuiz: Boolean,
  time: String,
  questions: [
    {
      question: String,
      points: Number,
      choices: [{
        choice: String,
        answer: Boolean
      }],
      subtopic: String
    }
  ],
  createdAt: String
});

module.exports = model("quiz", QuizSchema);
