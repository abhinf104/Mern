const User = require("../model/user");
const Course = require("../model/course");
const Admin = require("../model/admin");
const connectDB = require("./connect");
require("dotenv").config();
connectDB(process.env.MONGO_URI);

// Function to populate the database
const Populate = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Admin.deleteMany({});

    // Create sample courses
    const course1 = new Course({
      title: "Introduction to Programming",
      description: "Learn the basics of programming using Python.",
      price: 49.99,
      imageId: "img1",
      isPublished: true,
    });
    const course2 = new Course({
      title: "Advanced JavaScript",
      description: "Deep dive into JavaScript and learn advanced concepts.",
      price: 79.99,
      imageId: "img2",
      isPublished: true,
    });

    await course1.save();
    await course2.save();
    console.log("courses saved");

    // Create sample users
    const user1 = new User({
      username: "user1",
      password: "password1",
      courseId: [course1._id],
    });

    const user2 = new User({
      username: "user2",
      password: "password2",
      courseId: [course2._id],
    });

    await user1.save();
    await user2.save();
    console.log("users saved");

    // Create sample admin
    const admin1 = new Admin({
      username: "admin1",
      password: "adminpassword1",
    });

    await admin1.save();
    console.log("admin saved");

    console.log("Sample data inserted");
    process.exit(0);
  } catch (err) {
    // Log an error message and exit the process with a failure code
    console.log("Error in populating the database", err);
    process.exit(1);
  }
};

// Call the Populate function to execute the database population
Populate();
