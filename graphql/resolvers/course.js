const Course = require("../../models/courseModel");
const User = require("../../models/userModel");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getCourses() {
      const courses = await Course.find();
      return courses;
    },
    async getCourse( courseId ) {
      const course = await Course.findById(courseId);
      return course;
    },
  },
  Mutation: {
    async createCourse(_, { title, description }, context) {
      const auth = checkAuth(context)

      if(!auth && auth.role !== teacher) {
        throw new Error("Not Authorized to create a course")
      }

      const newCourse = new Course({
        title,
        description,
        createdBy: auth,
        createdAt: new Date().toISOString()
      })
      const res = await newCourse.save()
      return {
        ...res._doc,
        id: res._id,
      }
    }
  }
};
