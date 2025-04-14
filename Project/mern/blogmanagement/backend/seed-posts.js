const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/user");
require("dotenv").config();

// Fix MongoDB connection string format and options
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/blogmanagement";

// MongoDB connection with proper error handling
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Don't specify authSource unless you're sure it's needed
  })
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Sample categories and tags
const categories = ["Technology", "Design", "Business", "Health", "Lifestyle"];

const tags = [
  "javascript",
  "webdev",
  "react",
  "nodejs",
  "mongodb",
  "programming",
  "frontend",
  "backend",
  "fullstack",
  "design",
];

// Use a single category template to simplify
const postContent = `
# Sample Blog Post

This is a sample blog post for testing. It includes formatting like:

## Subheadings

And some **bold text** or *italic text*.

- Bullet points
- For listing items

1. Numbered lists
2. For sequential items

> Blockquotes for highlighting important information

\`\`\`javascript
// Code blocks
function greeting() {
  return "Hello world!";
}
\`\`\`

This content helps test the rendering of markdown in your blog application.
`;

// Modified seed function with better error handling
const seedPosts = async () => {
  try {
    console.log("Starting database seeding process...");

    // Check if any users exist without creating a new one
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("No users found in database. Please create a user first.");
      console.log("You can do this by registering through your application.");
      process.exit(1);
    }

    // Get the first user to assign as author
    const author = await User.findOne();
    console.log(`Using user ${author.name} (${author.email}) as post author`);

    // Delete existing posts - BE CAREFUL IN PRODUCTION
    await Post.deleteMany({});
    console.log("Cleared existing posts collection");

    // Create sample posts
    const samplePosts = [];

    // Create 10 posts (reduced from 20 for faster execution)
    for (let i = 0; i < 10; i++) {
      // Randomly select a category
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      // Generate a simple post title
      const title = `Sample ${category} Post #${i + 1}`;

      // Generate random tags (2-3 tags)
      const numberOfTags = Math.floor(Math.random() * 2) + 2;
      const postTags = [];
      for (let j = 0; j < numberOfTags; j++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!postTags.includes(tag)) {
          postTags.push(tag);
        }
      }

      // Create post object with simplified content
      const post = {
        title,
        content: postContent,
        excerpt: postContent.substring(0, 150) + "...",
        categories: [category],
        tags: postTags,
        author: author._id,
        status: "published",
        viewCount: Math.floor(Math.random() * 100),
        likesCount: Math.floor(Math.random() * 20),
      };

      samplePosts.push(post);
    }

    // Insert posts
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`Successfully created ${createdPosts.length} sample posts`);

    // Disconnect
    mongoose.connection.close();
    console.log("MongoDB disconnected - seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function with better error handling
console.log("Starting blog post seeding script...");
seedPosts().catch((err) => {
  console.error("Fatal error during seeding:", err);
  mongoose.connection.close();
  process.exit(1);
});
