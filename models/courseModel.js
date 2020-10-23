const { model, Schema } = require("mongoose");

const CourseSchema = new Schema({
  title: String,
  description: String,
  createdAt: String,
  quiz: Array,
  createdBy: Object
});

module.exports = model("course", CourseSchema);
